const axios = require('axios');

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github+json',
  },
});

const fetchGithubUserData = async (username) => {
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    githubApi.defaults.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const [userRes, reposRes] = await Promise.all([
      githubApi.get(`/users/${username}`),
      githubApi.get(`/users/${username}/repos`, { params: { per_page: 100, sort: 'updated' } }),
    ]);

    const languagesPromises = reposRes.data.map((repo) => githubApi.get(repo.languages_url));
    const languagesResponses = await Promise.allSettled(languagesPromises);

    const languageTotals = languagesResponses.reduce((acc, next) => {
      if (next.status === 'fulfilled') {
        Object.entries(next.value.data).forEach(([language, bytes]) => {
          acc[language] = (acc[language] || 0) + bytes;
        });
      }
      return acc;
    }, {});

    const topLanguages = Object.entries(languageTotals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([language]) => language);

    return {
      profile: userRes.data,
      repos: reposRes.data,
      topLanguages,
      stats: {
        public_repos: userRes.data.public_repos,
        followers: userRes.data.followers,
        following: userRes.data.following,
      },
    };
  } catch (error) {
    if (error.response && error.response.status === 403) {
      const rateLimitRemaining = error.response.headers['x-ratelimit-remaining'];
      const errorMessage = rateLimitRemaining === '0'
        ? 'GitHub API rate limit exceeded. Please wait and try again.'
        : 'GitHub API access forbidden. Check your token and permissions.';
      const err = new Error(errorMessage);
      err.status = 429;
      throw err;
    }

    if (error.response && error.response.status === 404) {
      const err = new Error('GitHub user not found.');
      err.status = 404;
      throw err;
    }

    const err = new Error('Unable to fetch GitHub data.');
    err.status = 500;
    throw err;
  }
};

const CONTRIBUTION_CALENDAR_QUERY = `
  query ($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

const fetchContributionCalendar = async (username) => {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    const err = new Error('GITHUB_TOKEN is required to fetch contribution data.');
    err.status = 500;
    throw err;
  }

  try {
    const response = await axios.post(
      'https://api.github.com/graphql',
      { query: CONTRIBUTION_CALENDAR_QUERY, variables: { username } },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    if (response.data.errors?.length) {
      const err = new Error(response.data.errors[0].message || 'GitHub user not found.');
      err.status = 404;
      throw err;
    }

    const calendar = response.data.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) {
      const err = new Error('GitHub user not found.');
      err.status = 404;
      throw err;
    }

    const days = calendar.weeks.flatMap((week) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        commits: day.contributionCount,
      })),
    );

    return {
      totalContributions: calendar.totalContributions,
      days,
    };
  } catch (error) {
    if (error.status) throw error;

    if (error.response && error.response.status === 401) {
      const err = new Error('GitHub token is invalid or expired.');
      err.status = 401;
      throw err;
    }

    const err = new Error('Unable to fetch GitHub contribution data.');
    err.status = 500;
    throw err;
  }
};

module.exports = {
  fetchGithubUserData,
  fetchContributionCalendar,
};

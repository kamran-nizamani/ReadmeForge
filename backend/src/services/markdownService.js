const buildBanner = (profile, template) => {
  const title = profile.name || profile.login;
  const subtitle = profile.bio || 'A passionate developer building reliable software.';

  switch (template) {
    case 'minimal':
      return `# ${title}\n\n${subtitle}`;
    case 'professional':
      return `# ${title} \n### ${profile.location || 'Remote'} · ${profile.company || 'Independent'} \n\n${subtitle}`;
    case 'creative':
      return `# ✨ ${title} ✨\n\n> ${subtitle}`;
    case 'data-science':
      return `# ${title} — Data-Driven Developer\n\n${subtitle}`;
    case 'oss-contributor':
      return `# ${title} — Open Source Contributor\n\n${subtitle}`;
    default:
      return `# ${title}\n\n${subtitle}`;
  }
};

const buildTechStack = (topLanguages = []) => {
  if (!topLanguages.length) {
    return 'No top languages detected yet. Add your favorite tools manually.';
  }

  return topLanguages
    .map((language) => `![${language}](https://img.shields.io/badge/${encodeURIComponent(language)}-000000?style=for-the-badge&logo=${encodeURIComponent(language.toLowerCase())})`)
    .join(' ');
};

const buildStatsCard = (profile) => {
  const username = profile.login;
  return `![GitHub stats](https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=radical)`;
};

const buildLanguagesChart = (profile) => {
  const username = profile.login;
  return `![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=radical)`;
};

const buildSocialLinks = (profile) => {
  const githubUrl = profile.html_url;
  const twitter = profile.twitter_username ? `- [Twitter](https://twitter.com/${profile.twitter_username})\n` : '';
  const website = profile.blog ? `- [Website](${profile.blog})\n` : '';
  return `- [GitHub](${githubUrl})\n${twitter}${website}- [LinkedIn](https://www.linkedin.com/in/your-linkedin)\n- [Email](mailto:your.email@example.com)`;
};

const buildFeaturedRepos = (repos = []) => {
  if (!repos.length) {
    return 'No featured repositories selected yet.';
  }

  return repos.slice(0, 4).map((repo) => {
    const description = repo.description ? repo.description.replace(/\n/g, ' ') : 'No description provided.';
    return `### [${repo.name}](${repo.html_url})\n${description} \n- ⭐ ${repo.stargazers_count} | 🧠 ${repo.language || 'Unknown'}`;
  }).join('\n\n');
};

const defaultConfig = {
  includeHeader: true,
  includeAbout: true,
  includeTechStack: true,
  includeStatsCard: true,
  includeLanguagesChart: true,
  includeSocialLinks: true,
  includeFeaturedRepos: true,
  include3DVisual: false,
};

const generateMarkdown = (userData, template = 'professional', config = {}) => {
  const mergedConfig = { ...defaultConfig, ...config };
  const { profile, repos = [], topLanguages = [], stats = {} } = userData;
  const header = mergedConfig.includeHeader ? `${buildBanner(profile, template)}\n\n` : '';
  const about = mergedConfig.includeAbout ? `## About Me\n${profile.bio || 'I am a software engineer who loves building meaningful applications.'}\n\n` : '';
  const techStack = mergedConfig.includeTechStack ? `## Tech Stack\n${buildTechStack(topLanguages)}\n\n` : '';
  const statsCard = mergedConfig.includeStatsCard ? `## GitHub Stats\n${buildStatsCard(profile)}\n\n` : '';
  const languagesChart = mergedConfig.includeLanguagesChart ? `## Top Languages\n${buildLanguagesChart(profile)}\n\n` : '';
  const socialLinks = mergedConfig.includeSocialLinks ? `## Connect with Me\n${buildSocialLinks(profile)}\n\n` : '';
  const featuredRepos = mergedConfig.includeFeaturedRepos ? `## Featured Projects\n${buildFeaturedRepos(repos)}\n` : '';
  const visualSection = mergedConfig.include3DVisual && mergedConfig.snapshotUrl
    ? `## 3D Visual\n![3D GitHub visual](${mergedConfig.snapshotUrl})\n\n`
    : '';

  return `${header}${about}${techStack}${statsCard}${languagesChart}${visualSection}${socialLinks}${featuredRepos}`.trim();
};

module.exports = {
  generateMarkdown,
};

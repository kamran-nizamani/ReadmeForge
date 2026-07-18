const { generateMarkdown } = require('./markdownService');

const exampleUserData = {
  profile: {
    login: 'octocat',
    name: 'Octo Cat',
    bio: 'Open source enthusiast',
    location: 'San Francisco',
    company: 'GitHub',
    html_url: 'https://github.com/octocat',
    twitter_username: 'octocat',
    blog: 'https://octocat.dev',
  },
  repos: [
    {
      id: 1,
      name: 'readme-generator',
      html_url: 'https://github.com/octocat/readme-generator',
      description: 'A generator for README files.',
      stargazers_count: 42,
      language: 'JavaScript',
    },
  ],
  topLanguages: ['JavaScript', 'TypeScript'],
};

describe('generateMarkdown', () => {
  it('generates professional template markdown', () => {
    const markdown = generateMarkdown(exampleUserData, 'professional');
    expect(markdown).toContain('# Octo Cat');
    expect(markdown).toContain('## Tech Stack');
    expect(markdown).toContain('## GitHub Stats');
  });

  it('generates minimal template markdown without stats card', () => {
    const markdown = generateMarkdown(exampleUserData, 'minimal', { includeStatsCard: false });
    expect(markdown).toContain('# Octo Cat');
    expect(markdown).not.toContain('GitHub Stats');
  });

  it('generates creative template markdown with featured repos disabled', () => {
    const markdown = generateMarkdown(exampleUserData, 'creative', { includeFeaturedRepos: false });
    expect(markdown).toContain('✨ Octo Cat ✨');
    expect(markdown).not.toContain('Featured Projects');
  });

  it('includes fallback text for empty top languages', () => {
    const markdown = generateMarkdown({ ...exampleUserData, topLanguages: [] }, 'professional');
    expect(markdown).toContain('No top languages detected yet.');
  });
});

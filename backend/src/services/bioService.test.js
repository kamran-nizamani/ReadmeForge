const { generateDeveloperBio, fallbackBio } = require('./bioService');

const payload = {
  name: 'Avery Jones',
  role: 'Full Stack Engineer',
  topLanguages: ['JavaScript', 'React', 'Node.js'],
  topRepos: [
    { name: 'readmeforge', description: 'A README generation platform.' },
    { name: 'profile-visualizer', description: 'A GitHub profile visualization tool.' },
  ],
};

describe('bioService', () => {
  it('returns fallback bio when no API key is configured', async () => {
    const originalKey = process.env.ANTHROPIC_API_KEY;
    delete process.env.ANTHROPIC_API_KEY;

    const bio = await generateDeveloperBio(payload);
    expect(bio).toContain('Avery Jones is a professional Full Stack Engineer');
    expect(bio).toContain('JavaScript, React, Node.js');

    process.env.ANTHROPIC_API_KEY = originalKey;
  });

  it('fallbackBio includes top languages and featured repo names', () => {
    const bio = fallbackBio(payload);
    expect(bio).toContain('JavaScript, React, Node.js');
    expect(bio).toContain('readmeforge and profile-visualizer');
  });
});

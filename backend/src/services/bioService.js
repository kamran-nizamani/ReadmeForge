const axios = require('axios');

const anthropicApi = axios.create({
  baseURL: 'https://api.anthropic.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

const fallbackBio = ({ name, topLanguages, topRepos, role }) => {
  const primaryTech = topLanguages.slice(0, 3).join(', ');
  const featured = topRepos.slice(0, 2).map((repo) => repo.name).join(' and ');

  return `${name} is a professional ${role || 'software developer'} with hands-on experience in ${primaryTech}. Their work includes projects such as ${featured}, and they build clean, maintainable developer experiences for GitHub README audiences.`;
};

const buildPrompt = ({ name, topLanguages, topRepos, role }) => {
  const reposList = topRepos.slice(0, 3).map((repo) => `- ${repo.name}: ${repo.description || 'Key project.'}`).join('\n');

  return `You are an expert technical writer. Write in a professional, confident tone, avoid clichés, and focus on the specific technologies and projects provided. Create a 2-3 sentence developer bio suitable for a GitHub README.\n\nName: ${name}\nRole: ${role || 'Software Developer'}\nTop Languages: ${topLanguages.join(', ')}\nFeatured Projects:\n${reposList}\n\nBio:`;
};

const generateDeveloperBio = async (payload) => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return fallbackBio(payload);
  }

  try {
    const prompt = buildPrompt(payload);
    const response = await anthropicApi.post('/responses', {
      model: 'claude-sonnet-4-6',
      messages: [
        { role: 'system', content: 'You are a professional assistant that writes polished GitHub README bios.' },
        { role: 'user', content: prompt },
      ],
      max_tokens_to_sample: 120,
    }, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const content = response.data?.completion || response.data?.output?.[0]?.content || '';
    if (!content.trim()) {
      return fallbackBio(payload);
    }

    return content.trim();
  } catch (error) {
    console.error('Anthropic API error', error.message || error);
    return fallbackBio(payload);
  }
};

module.exports = { generateDeveloperBio, fallbackBio };

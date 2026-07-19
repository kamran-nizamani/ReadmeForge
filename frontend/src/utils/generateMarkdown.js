const encodeBadgeLabel = (text) => encodeURIComponent(text.replace(/\s+/g, '_'));

export const buildSkillBadgeRow = (selectedSkills, style) => {
  if (!selectedSkills.length) {
    return 'No skills selected yet.';
  }

  return selectedSkills
    .map((skill) => {
      const logoKey = encodeURIComponent(skill.id);
      const label = encodeBadgeLabel(skill.label);
      if (style === 'icons') {
        return `![${skill.label}](https://raw.githubusercontent.com/devicons/devicon/master/icons/${skill.id}/${skill.id}-original.svg)`;
      }
      return `![${skill.label}](https://img.shields.io/badge/${label}-000000?style=for-the-badge&logo=${logoKey}&logoColor=white)`;
    })
    .join(' ');
};

export const buildSocialBadges = (socialItems) => {
  return socialItems
    .filter((item) => item.checked && item.value)
    .map((item) => {
      const label = encodeBadgeLabel(item.label);
      const value = encodeBadgeLabel(item.value.replace(/^https?:\/\//, ''));
      const logoKey = encodeURIComponent(item.logo || item.id);
      const url = item.type === 'url' ? item.value : `${item.baseUrl}${item.value}`;
      return `[![${item.label}](https://img.shields.io/badge/${label}-${value}-000000?style=for-the-badge&logo=${logoKey}&logoColor=white)](${url})`;
    })
    .join(' ');
};

export const buildAddOnBlocks = (username, addOns) => {
  const blocks = [];
  const trimmedUsername = username?.trim();

  if (addOns.visitorCount && trimmedUsername) {
    blocks.push(`![Profile views](https://komarev.com/ghpvc/?username=${trimmedUsername}&color=blue)`);
  }
  if (addOns.trophy && trimmedUsername) {
    blocks.push(`![Trophy](https://github-profile-trophy.vercel.app/?username=${trimmedUsername}&theme=dark)`);
  }
  if (addOns.statsCard && trimmedUsername) {
    blocks.push(`![GitHub stats](https://github-readme-stats.vercel.app/api?username=${trimmedUsername}&show_icons=true&theme=radical)`);
  }
  if (addOns.topLanguages && trimmedUsername) {
    blocks.push(`![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=${trimmedUsername}&layout=compact&theme=radical)`);
  }
  if (addOns.streakStats && trimmedUsername) {
    blocks.push(`![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=${trimmedUsername}&theme=dark)`);
  }
  if (addOns.twitterFollow && addOns.twitterUsername) {
    blocks.push(`[![Twitter Follow](https://img.shields.io/twitter/follow/${addOns.twitterUsername}?style=social)](https://twitter.com/${addOns.twitterUsername})`);
  }
  if (addOns.blogPosts) {
    blocks.push('> Latest blog posts are shown dynamically with a GitHub Actions workflow.');
  }
  if (addOns.contributionGraph3D && addOns.contributionSnapshotUrl) {
    blocks.push(`### 3D Contribution Graph\n\n![3D Contribution Graph](${addOns.contributionSnapshotUrl})`);
  }

  return blocks.join('\n\n');
};

export const generateReadmeMarkdown = ({ title, subtitle, work, username, selectedSkills, skillStyle, socialItems, addOns }) => {
  const header = title ? `# ${title}` : '# Hi there 👋';
  const subtitleLine = subtitle ? `\n\n${subtitle}` : '';
  const workLine = work ? `\n\n${work}` : '';
  const skillSection = selectedSkills.length
    ? `\n\n## Skills\n${buildSkillBadgeRow(selectedSkills, skillStyle)}`
    : '';
  const socialSection = socialItems.some((item) => item.checked && item.value)
    ? `\n\n## Connect with me\n${buildSocialBadges(socialItems)}`
    : '';
  const addOnsSection = buildAddOnBlocks(username, addOns)
    ? `\n\n## Add-ons\n${buildAddOnBlocks(username, addOns)}`
    : '';

  return `${header}${subtitleLine}${workLine}${skillSection}${socialSection}${addOnsSection}`.trim();
};

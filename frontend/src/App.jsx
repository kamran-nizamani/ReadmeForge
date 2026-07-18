import { useMemo, useState } from 'react';
import AddOnsForm from './components/AddOnsForm';
import ConfigIO from './components/ConfigIO';
import MarkdownPreview from './components/MarkdownPreview';
import SkillsPicker from './components/SkillsPicker';
import SocialLinksForm from './components/SocialLinksForm';
import TitleSubtitleForm from './components/TitleSubtitleForm';
import { generateReadmeMarkdown } from './utils/generateMarkdown';
import { socialNetworks } from './data/socialNetworks';
import { skillCategories } from './data/skillCategories';

const initialSocialItems = socialNetworks.map((network) => ({
  ...network,
  checked: false,
  value: '',
}));

const initialAddOns = {
  visitorCount: false,
  trophy: false,
  statsCard: false,
  topLanguages: false,
  streakStats: false,
  twitterFollow: false,
  twitterUsername: '',
  blogPosts: false,
};

const initialSelectedSkills = skillCategories.reduce((acc, category) => {
  category.skills.forEach((skill) => {
    acc[skill.id] = false;
  });
  return acc;
}, {});

const App = () => {
  const [title, setTitle] = useState('Hi there 👋 I build polished README content');
  const [subtitle, setSubtitle] = useState('A form-first README generator for open source maintainers and portfolio creators.');
  const [work, setWork] = useState('Building accessible developer tools, docs, and polished project landing pages.');
  const [username, setUsername] = useState('');
  const [selectedSkills, setSelectedSkills] = useState(initialSelectedSkills);
  const [skillStyle, setSkillStyle] = useState('shields');
  const [socialItems, setSocialItems] = useState(initialSocialItems);
  const [addOns, setAddOns] = useState(initialAddOns);

  const selectedSkillObjects = useMemo(() => {
    return skillCategories
      .flatMap((category) => category.skills)
      .filter((skill) => selectedSkills[skill.id]);
  }, [selectedSkills]);

  const markdown = useMemo(
    () =>
      generateReadmeMarkdown({
        title,
        subtitle,
        work,
        username,
        selectedSkills: selectedSkillObjects,
        skillStyle,
        socialItems,
        addOns,
      }),
    [title, subtitle, work, username, selectedSkillObjects, skillStyle, socialItems, addOns],
  );

  const updateSocialItems = (nextItems) => {
    setSocialItems(nextItems);
  };

  const handleToggleSkill = (skillId) => {
    setSelectedSkills((prev) => ({ ...prev, [skillId]: !prev[skillId] }));
  };

  const handleFormValueChange = (field, value) => {
    switch (field) {
      case 'title':
        setTitle(value);
        break;
      case 'subtitle':
        setSubtitle(value);
        break;
      case 'work':
        setWork(value);
        break;
      case 'username':
        setUsername(value);
        break;
      default:
        break;
    }
  };

  const handleAddOnChange = (key, value) => {
    setAddOns((prev) => ({ ...prev, [key]: value }));
  };

  const handleRestoreConfig = (config) => {
    if (config.title) setTitle(config.title);
    if (config.subtitle) setSubtitle(config.subtitle);
    if (config.work) setWork(config.work);
    if (config.username) setUsername(config.username);
    if (config.selectedSkills) setSelectedSkills((prev) => ({ ...prev, ...config.selectedSkills }));
    if (config.skillStyle) setSkillStyle(config.skillStyle);
    if (config.socialItems) setSocialItems(config.socialItems);
    if (config.addOns) setAddOns((prev) => ({ ...prev, ...config.addOns }));
  };

  const handleReset = () => {
    setTitle('Hi there 👋 I build polished README content');
    setSubtitle('A form-first README generator for open source maintainers and portfolio creators.');
    setWork('Building accessible developer tools, docs, and polished project landing pages.');
    setUsername('');
    setSelectedSkills(initialSelectedSkills);
    setSkillStyle('shields');
    setSocialItems(initialSocialItems);
    setAddOns(initialAddOns);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="mx-auto grid max-w-[1400px] gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="space-y-6">
          <header className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/40">
            <h1 className="text-5xl font-semibold text-white">ReadmeForge</h1>
            <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-300">
              Build README content from a simple form. Choose skills, social links, GitHub widgets, then copy markdown instantly.
            </p>
          </header>

          <div className="grid gap-6">
            <TitleSubtitleForm
              title={title}
              subtitle={subtitle}
              work={work}
              username={username}
              onChange={handleFormValueChange}
            />
            <SkillsPicker
              selectedSkills={selectedSkills}
              skillStyle={skillStyle}
              onToggleSkill={handleToggleSkill}
              onStyleChange={setSkillStyle}
            />
            <SocialLinksForm socialItems={socialItems} onUpdate={updateSocialItems} />
            <AddOnsForm addOns={addOns} onChange={handleAddOnChange} />
            <ConfigIO
              config={{ title, subtitle, work, username, selectedSkills, skillStyle, socialItems, addOns }}
              onSave={() => {}}
              onRestore={handleRestoreConfig}
              onReset={handleReset}
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-slate-950/20 backdrop-blur-xl">
            <h2 className="text-xl font-semibold text-white">Live output</h2>
            <p className="mt-2 text-sm text-slate-400">Your README markdown updates automatically as you edit the form.</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-4">
                <p className="text-sm text-slate-300">Title</p>
                <p className="mt-2 text-lg font-semibold text-white">{title}</p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-4">
                <p className="text-sm text-slate-300">GitHub username</p>
                <p className="mt-2 text-lg font-semibold text-white">{username || 'Not set'}</p>
              </div>
            </div>
          </div>

          <MarkdownPreview markdown={markdown} />
        </section>
      </div>
    </div>
  );
};

export default App;

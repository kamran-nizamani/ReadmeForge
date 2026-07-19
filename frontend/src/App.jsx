import { useMemo, useState } from 'react';
import AddOnsForm from './components/AddOnsForm';
import ConfigIO from './components/ConfigIO';
import ContributionGraphPanel from './components/ContributionGraphPanel';
import FAQSection from './components/FAQSection';
import MarkdownPreview from './components/MarkdownPreview';
import SectionStep from './components/SectionStep';
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
  contributionGraph3D: false,
  contributionSnapshotUrl: '',
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
    <div className="relative min-h-screen overflow-x-hidden text-slate-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 animate-float rounded-full bg-brand-600/25 blur-[110px]" />
        <div className="absolute -right-24 top-40 h-[28rem] w-[28rem] animate-float-delayed rounded-full bg-fuchsia-600/20 blur-[130px]" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 animate-float rounded-full bg-cyan-500/10 blur-[110px]" />
      </div>

      <nav className="sticky top-0 z-20 border-b border-white/5 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-4">
          <a href="#top" className="flex items-center gap-2 text-lg font-semibold text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-fuchsia-500 text-sm font-bold shadow-glow">
              R
            </span>
            ReadmeForge
          </a>
          <div className="hidden items-center gap-6 text-sm font-medium text-slate-400 md:flex">
            <a href="#basics" className="transition hover:text-white">Basics</a>
            <a href="#skills" className="transition hover:text-white">Skills</a>
            <a href="#contributions" className="transition hover:text-white">3D Graph</a>
            <a href="#output" className="transition hover:text-white">Preview</a>
            <a href="#faq" className="transition hover:text-white">FAQ</a>
          </div>
          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
            ● Live preview
          </span>
        </div>
      </nav>

      <div id="top" className="mx-auto grid max-w-[1400px] gap-6 p-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="space-y-6">
          <header className="panel relative overflow-hidden p-8 shadow-2xl shadow-slate-950/40">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-200">
              Form-first README builder
            </span>
            <h1 className="mt-4 bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-5xl font-extrabold leading-tight text-transparent">
              ReadmeForge
            </h1>
            <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-300">
              Build a polished README from a simple form — pick skills, socials, and GitHub widgets, spin up a real-time 3D contribution graph, then copy markdown instantly.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['React + Vite', 'Express API', 'Three.js 3D scenes', 'Live GitHub data'].map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="grid gap-6">
            <SectionStep number={1} id="basics">
              <TitleSubtitleForm
                title={title}
                subtitle={subtitle}
                work={work}
                username={username}
                onChange={handleFormValueChange}
              />
            </SectionStep>
            <SectionStep number={2} id="skills">
              <SkillsPicker
                selectedSkills={selectedSkills}
                skillStyle={skillStyle}
                onToggleSkill={handleToggleSkill}
                onStyleChange={setSkillStyle}
              />
            </SectionStep>
            <SectionStep number={3}>
              <SocialLinksForm socialItems={socialItems} onUpdate={updateSocialItems} />
            </SectionStep>
            <SectionStep number={4} id="contributions">
              <ContributionGraphPanel username={username} addOns={addOns} onAddOnChange={handleAddOnChange} />
            </SectionStep>
            <SectionStep number={5}>
              <AddOnsForm addOns={addOns} onChange={handleAddOnChange} />
            </SectionStep>
            <SectionStep number={6}>
              <ConfigIO
                config={{ title, subtitle, work, username, selectedSkills, skillStyle, socialItems, addOns }}
                onSave={() => {}}
                onRestore={handleRestoreConfig}
                onReset={handleReset}
              />
            </SectionStep>
          </div>

          <div id="faq">
            <FAQSection />
          </div>
        </section>

        <section id="output" className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="panel">
            <h2 className="text-xl font-semibold text-white">Live output</h2>
            <p className="mt-2 text-sm text-slate-400">Your README markdown updates automatically as you edit the form.</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="panel-inset p-4">
                <p className="text-sm text-slate-400">Title</p>
                <p className="mt-2 truncate text-lg font-semibold text-white">{title}</p>
              </div>
              <div className="panel-inset p-4">
                <p className="text-sm text-slate-400">GitHub username</p>
                <p className="mt-2 truncate text-lg font-semibold text-white">{username || 'Not set'}</p>
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

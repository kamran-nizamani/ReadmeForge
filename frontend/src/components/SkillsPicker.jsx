import { useMemo, useState } from 'react';
import { skillCategories } from '../data/skillCategories';

const getIconUrl = (skillId) => `https://raw.githubusercontent.com/devicons/devicon/master/icons/${skillId}/${skillId}-original.svg`;

const SkillRow = ({ skill, checked, onToggle }) => {
  return (
    <label className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/80 px-3 py-2 transition hover:border-brand">
      <input type="checkbox" checked={checked} onChange={() => onToggle(skill.id)} className="h-4 w-4 accent-brand" />
      <img src={getIconUrl(skill.id)} alt={skill.label} className="h-6 w-6 rounded-lg bg-slate-900 p-1" />
      <span className="text-sm text-slate-100">{skill.label}</span>
    </label>
  );
};

const SkillsPicker = ({ selectedSkills, skillStyle, onToggleSkill, onStyleChange }) => {
  const [search, setSearch] = useState('');
  const [collapsed, setCollapsed] = useState({});

  const filteredCategories = useMemo(() => {
    const term = search.trim().toLowerCase();
    return skillCategories.map((category) => {
      const skills = category.skills.filter((skill) => skill.label.toLowerCase().includes(term));
      return {
        ...category,
        skills,
      };
    }).filter((category) => category.skills.length > 0);
  }, [search]);

  const toggleCategory = (category) => {
    setCollapsed((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20 backdrop-blur-xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Skills</h2>
          <p className="mt-2 text-sm text-slate-400">Search and select skills to include in your README badges.</p>
        </div>
        <div className="space-y-2">
          <span className="text-sm text-slate-300">Badge style</span>
          <div className="flex flex-wrap gap-2">
            {['shields', 'icons'].map((style) => (
              <button
                key={style}
                type="button"
                onClick={() => onStyleChange(style)}
                className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${skillStyle === style ? 'bg-brand text-white' : 'bg-slate-950 text-slate-300 hover:bg-slate-900'}`}
              >
                {style === 'shields' ? 'Shields' : 'Icons'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto]">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search skills"
          className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-brand"
        />
      </div>

      <div className="mt-6 space-y-5">
        {filteredCategories.map((category) => (
          <div key={category.category} className="rounded-3xl border border-slate-800 bg-slate-950/90 p-4">
            <button
              type="button"
              onClick={() => toggleCategory(category.category)}
              className="flex w-full items-center justify-between text-left text-lg font-semibold text-white"
            >
              <span>{category.category}</span>
              <span className="text-slate-400">{collapsed[category.category] ? '+' : '-'}</span>
            </button>
            {!collapsed[category.category] && (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {category.skills.map((skill) => (
                  <SkillRow key={skill.id} skill={skill} checked={selectedSkills[skill.id]} onToggle={onToggleSkill} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsPicker;

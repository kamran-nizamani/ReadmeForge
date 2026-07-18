const TitleSubtitleForm = ({ title, subtitle, work, username, onChange }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20 backdrop-blur-xl">
      <h2 className="text-xl font-semibold text-white">Profile Basics</h2>
      <p className="mt-2 text-sm text-slate-400">Set the headline and GitHub username that power your README.</p>

      <div className="mt-6 space-y-4">
        <label className="block space-y-2 text-sm text-slate-300">
          <span>Title</span>
          <input
            value={title}
            onChange={(e) => onChange('title', e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-brand"
            placeholder="Hi 👋, I'm Kamran"
          />
        </label>

        <label className="block space-y-2 text-sm text-slate-300">
          <span>Subtitle</span>
          <input
            value={subtitle}
            onChange={(e) => onChange('subtitle', e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-brand"
            placeholder="A passionate BSSE student and open-source contributor"
          />
        </label>

        <label className="block space-y-2 text-sm text-slate-300">
          <span>Work</span>
          <textarea
            value={work}
            onChange={(e) => onChange('work', e.target.value)}
            rows={3}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-brand"
            placeholder="Currently working on open-source design tools and community projects."
          />
        </label>

        <label className="block space-y-2 text-sm text-slate-300">
          <span>GitHub username</span>
          <input
            value={username}
            onChange={(e) => onChange('username', e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-brand"
            placeholder="kamran"
          />
        </label>
      </div>
    </div>
  );
};

export default TitleSubtitleForm;

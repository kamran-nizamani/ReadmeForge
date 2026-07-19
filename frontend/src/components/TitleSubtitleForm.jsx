const TitleSubtitleForm = ({ title, subtitle, work, username, onChange }) => {
  return (
    <div className="panel">
      <h2 className="text-xl font-semibold text-white">👋 Basic Information</h2>
      <p className="mt-2 text-sm text-slate-400">Set the headline and GitHub username that power your README.</p>

      <div className="mt-6 space-y-4">
        <label className="block space-y-2 text-sm text-slate-300">
          <span>Title</span>
          <input
            value={title}
            onChange={(e) => onChange('title', e.target.value)}
            className="field"
            placeholder="Hi 👋, I'm Kamran"
          />
        </label>

        <label className="block space-y-2 text-sm text-slate-300">
          <span>Subtitle</span>
          <input
            value={subtitle}
            onChange={(e) => onChange('subtitle', e.target.value)}
            className="field"
            placeholder="A passionate BSSE student and open-source contributor"
          />
        </label>

        <label className="block space-y-2 text-sm text-slate-300">
          <span>Work</span>
          <textarea
            value={work}
            onChange={(e) => onChange('work', e.target.value)}
            rows={3}
            className="field"
            placeholder="Currently working on open-source design tools and community projects."
          />
        </label>

        <label className="block space-y-2 text-sm text-slate-300">
          <span>GitHub username</span>
          <input
            value={username}
            onChange={(e) => onChange('username', e.target.value)}
            className="field"
            placeholder="kamran"
          />
        </label>
      </div>
    </div>
  );
};

export default TitleSubtitleForm;

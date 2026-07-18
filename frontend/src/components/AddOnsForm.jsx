const AddOnsForm = ({ addOns, onChange }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20 backdrop-blur-xl">
      <h2 className="text-xl font-semibold text-white">Add-ons</h2>
      <p className="mt-2 text-sm text-slate-400">Enable extra README widgets, cards, and GitHub stats blocks.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {[
          { key: 'visitorCount', label: 'Profile views badge' },
          { key: 'trophy', label: 'GitHub trophy card' },
          { key: 'statsCard', label: 'GitHub stats card' },
          { key: 'topLanguages', label: 'Top languages card' },
          { key: 'streakStats', label: 'GitHub streak stats' },
          { key: 'blogPosts', label: 'Blog posts note' },
        ].map((item) => (
          <label key={item.key} className="flex items-start gap-3 rounded-3xl border border-slate-800 bg-slate-950/90 p-4">
            <input
              type="checkbox"
              checked={addOns[item.key]}
              onChange={(e) => onChange(item.key, e.target.checked)}
              className="mt-1 h-4 w-4 accent-brand"
            />
            <div>
              <p className="font-medium text-slate-100">{item.label}</p>
              <p className="mt-1 text-sm text-slate-400">{item.label === 'Blog posts note' ? 'Show a placeholder suggesting a GitHub Actions workflow.' : 'Embed this widget by adding your username.'}</p>
            </div>
          </label>
        ))}

        <div className="sm:col-span-2 rounded-3xl border border-slate-800 bg-slate-950/90 p-4">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={addOns.twitterFollow}
              onChange={(e) => onChange('twitterFollow', e.target.checked)}
              className="h-4 w-4 accent-brand"
            />
            <span className="font-medium text-slate-100">Twitter follow badge</span>
          </label>
          {addOns.twitterFollow && (
            <div className="mt-4">
              <input
                value={addOns.twitterUsername}
                onChange={(e) => onChange('twitterUsername', e.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-brand"
                placeholder="twitter username"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddOnsForm;

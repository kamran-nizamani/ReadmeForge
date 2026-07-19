import ToggleSwitch from './ToggleSwitch';

const AddOnsForm = ({ addOns, onChange }) => {
  return (
    <div className="panel">
      <h2 className="text-xl font-semibold text-white">⚙️ Add-ons</h2>
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
          <div key={item.key} className="panel-inset p-4">
            <ToggleSwitch
              checked={addOns[item.key]}
              onChange={(value) => onChange(item.key, value)}
              label={item.label}
              description={item.label === 'Blog posts note' ? 'Show a placeholder suggesting a GitHub Actions workflow.' : 'Embed this widget by adding your username.'}
            />
          </div>
        ))}

        <div className="panel-inset sm:col-span-2 p-4">
          <ToggleSwitch
            checked={addOns.twitterFollow}
            onChange={(value) => onChange('twitterFollow', value)}
            label="Twitter follow badge"
          />
          {addOns.twitterFollow && (
            <div className="mt-4">
              <input
                value={addOns.twitterUsername}
                onChange={(e) => onChange('twitterUsername', e.target.value)}
                className="field"
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

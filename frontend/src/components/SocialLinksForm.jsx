import { socialNetworks } from '../data/socialNetworks';

const SocialLinksForm = ({ socialItems, onUpdate }) => {
  const updateItem = (id, updatedFields) => {
    onUpdate(socialItems.map((item) => (item.id === id ? { ...item, ...updatedFields } : item)));
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20 backdrop-blur-xl">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Social Links</h2>
          <p className="mt-2 text-sm text-slate-400">Choose which network links and badges to include in your README.</p>
        </div>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-400">
          optional
        </span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {socialNetworks.map((network) => {
          const item = socialItems.find((entry) => entry.id === network.id) || {
            ...network,
            checked: false,
            value: '',
          };

          return (
            <label key={network.id} className="space-y-2 rounded-3xl border border-slate-800 bg-slate-950/90 p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium text-slate-100">{network.label}</span>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={(e) => updateItem(network.id, { checked: e.target.checked })}
                  className="h-4 w-4 accent-brand"
                />
              </div>
              <input
                value={item.value}
                onChange={(e) => updateItem(network.id, { value: e.target.value })}
                className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-brand"
                placeholder={network.placeholder}
              />
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default SocialLinksForm;

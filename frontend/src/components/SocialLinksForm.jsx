import { socialNetworks } from '../data/socialNetworks';
import ToggleSwitch from './ToggleSwitch';

const SocialLinksForm = ({ socialItems, onUpdate }) => {
  const updateItem = (id, updatedFields) => {
    onUpdate(socialItems.map((item) => (item.id === id ? { ...item, ...updatedFields } : item)));
  };

  return (
    <div className="panel">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">🔗 Social Links</h2>
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
            <div key={network.id} className="panel-inset space-y-3 p-4">
              <ToggleSwitch
                checked={item.checked}
                onChange={(value) => updateItem(network.id, { checked: value })}
                label={network.label}
              />
              <input
                value={item.value}
                onChange={(e) => updateItem(network.id, { value: e.target.value })}
                className="field"
                placeholder={network.placeholder}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SocialLinksForm;

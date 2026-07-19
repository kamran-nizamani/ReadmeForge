const ToggleSwitch = ({ checked, onChange, label, description }) => {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4">
      {(label || description) && (
        <div>
          {label && <p className="font-medium text-slate-100">{label}</p>}
          {description && <p className="mt-1 text-sm text-slate-400">{description}</p>}
        </div>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ${
          checked ? 'bg-gradient-to-r from-brand-500 to-fuchsia-500' : 'bg-slate-700'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </label>
  );
};

export default ToggleSwitch;

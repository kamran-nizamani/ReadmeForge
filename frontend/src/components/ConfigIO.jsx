const ConfigIO = ({ config, onSave, onRestore, onReset }) => {
  const downloadConfig = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'readmeforge-config.json';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    try {
      const parsed = JSON.parse(text);
      onRestore(parsed);
    } catch (error) {
      console.error('Restore failed', error);
      alert('Unable to load configuration. Please provide a valid JSON file.');
    }
  };

  return (
    <div className="panel">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">💾 Configuration</h2>
          <p className="mt-2 text-sm text-slate-400">Save and restore your README builder state locally.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={downloadConfig}
            className="rounded-2xl bg-gradient-to-r from-brand-500 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition hover:opacity-90"
          >
            Download config
          </button>
          <button
            type="button"
            onClick={onReset}
            className="rounded-2xl bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-700"
          >
            Reset form
          </button>
        </div>
      </div>

      <div className="panel-inset mt-6 p-4">
        <label className="flex flex-col gap-2 text-sm text-slate-300">
          <span>Upload config</span>
          <input type="file" accept="application/json" onChange={handleFileChange} className="text-slate-100" />
        </label>
      </div>
    </div>
  );
};

export default ConfigIO;

import { useState } from 'react';
import axios from 'axios';
import ContributionScene3D from './ContributionScene3D';
import ToggleSwitch from './ToggleSwitch';

const BACKEND_ORIGIN = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

const ContributionGraphPanel = ({ username, addOns, onAddOnChange }) => {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [calendar, setCalendar] = useState(null);
  const [capturing, setCapturing] = useState(false);

  const trimmedUsername = username?.trim();

  const fetchContributions = async () => {
    if (!trimmedUsername) {
      setError('Enter a GitHub username above first.');
      return;
    }

    setStatus('loading');
    setError('');
    try {
      const { data } = await axios.get(`/api/github/${trimmedUsername}/contributions`);
      setCalendar(data);
      setStatus('ready');
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to fetch contribution data.');
      setStatus('error');
    }
  };

  const captureSnapshot = async () => {
    if (!calendar) return;
    setCapturing(true);
    try {
      const { data } = await axios.post('/api/snapshot', {
        sceneType: 'contribution-chart',
        config: { data: calendar.days },
      });
      onAddOnChange('contributionSnapshotUrl', `${BACKEND_ORIGIN}${data.snapshotUrl}`);
      onAddOnChange('contributionGraph3D', true);
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to capture snapshot.');
    } finally {
      setCapturing(false);
    }
  };

  return (
    <div className="panel">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
            📊 3D Contribution Graph
            <span className="rounded-full bg-gradient-to-r from-fuchsia-500 to-brand-500 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-white">
              New
            </span>
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Turn your real GitHub contribution calendar into a rotating 3D bar chart, then capture it as an image for your README.
          </p>
        </div>
        <button
          type="button"
          onClick={fetchContributions}
          disabled={status === 'loading'}
          className="rounded-2xl bg-gradient-to-r from-brand-500 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === 'loading' ? 'Loading…' : 'Generate 3D graph'}
        </button>
      </div>

      {error && (
        <p className="mt-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{error}</p>
      )}

      {calendar && (
        <div className="mt-6 space-y-4">
          <div className="panel-inset flex flex-wrap items-center justify-between gap-3 px-4 py-3">
            <p className="text-sm text-slate-300">
              <span className="text-lg font-semibold text-white">{calendar.totalContributions.toLocaleString()}</span> contributions in the last year
            </p>
            <button
              type="button"
              onClick={captureSnapshot}
              disabled={capturing}
              className="rounded-2xl bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {capturing ? 'Capturing…' : 'Capture & add to README'}
            </button>
          </div>

          <ContributionScene3D data={calendar.days} />

          {addOns.contributionSnapshotUrl && (
            <div className="panel-inset p-4">
              <ToggleSwitch
                checked={addOns.contributionGraph3D}
                onChange={(value) => onAddOnChange('contributionGraph3D', value)}
                label="Include 3D contribution graph in README"
                description="Embeds the captured snapshot image in your generated markdown."
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContributionGraphPanel;

import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import TechOrbitScene3D from '../components/TechOrbitScene3D';
import ContributionScene3D from '../components/ContributionScene3D';

const parseConfig = (search) => {
  const params = new URLSearchParams(search);
  try {
    const raw = params.get('config');
    if (!raw) return {};
    return JSON.parse(decodeURIComponent(raw));
  } catch (error) {
    return {};
  }
};

const SnapshotViewer = () => {
  const { sceneType } = useParams();
  const config = useMemo(() => parseConfig(useLocation().search), [useLocation().search]);

  if (sceneType === 'tech-orbit') {
    return (
      <div className="snapshot-root min-h-screen bg-slate-950 p-6 text-slate-100">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6">
          <TechOrbitScene3D languages={config.languages || ['JavaScript', 'React', 'Node.js', 'Tailwind']} avatarUrl={config.avatarUrl} />
        </div>
      </div>
    );
  }

  if (sceneType === 'contribution-chart') {
    const data = config.data || Array.from({ length: 30 }, (_, index) => ({ date: `day-${index + 1}`, commits: Math.floor(Math.random() * 12) + 1 }));
    return (
      <div className="snapshot-root min-h-screen bg-slate-950 p-6 text-slate-100">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6">
          <ContributionScene3D data={data} />
        </div>
      </div>
    );
  }

  return <div className="snapshot-root min-h-screen bg-slate-950 p-6 text-slate-100">Unsupported snapshot type.</div>;
};

export default SnapshotViewer;

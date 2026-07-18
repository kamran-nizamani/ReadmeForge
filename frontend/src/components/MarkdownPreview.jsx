import { useMemo, useState } from 'react';
import { marked } from 'marked';

const MarkdownPreview = ({ markdown }) => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState('code');

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error('Copy failed', error);
    }
  };

  const downloadReadme = () => {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'README.md';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const renderedHtml = useMemo(() => {
    return marked.parse(markdown || '');
  }, [markdown]);

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20 backdrop-blur-xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Markdown Preview</h2>
          <p className="mt-2 text-sm text-slate-400">Review your README content, copy it, or download it as README.md.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setViewMode('code')}
            className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${viewMode === 'code' ? 'bg-brand text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'}`}
          >
            Code
          </button>
          <button
            type="button"
            onClick={() => setViewMode('render')}
            className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${viewMode === 'render' ? 'bg-brand text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'}`}
          >
            Live preview
          </button>
          <button
            type="button"
            onClick={copyToClipboard}
            className="rounded-2xl bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-700"
          >
            {copied ? 'Copied!' : 'Copy markdown'}
          </button>
          <button
            type="button"
            onClick={downloadReadme}
            className="rounded-2xl bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Download README.md
          </button>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/90 p-4">
        {viewMode === 'code' ? (
          <pre className="max-h-[500px] whitespace-pre-wrap break-words text-sm leading-6 text-slate-200">{markdown}</pre>
        ) : (
          <div
            className="prose prose-invert max-h-[500px] overflow-auto text-sm leading-6"
            dangerouslySetInnerHTML={{ __html: renderedHtml }}
          />
        )}
      </div>
    </div>
  );
};

export default MarkdownPreview;

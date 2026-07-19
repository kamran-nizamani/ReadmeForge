import { useState } from 'react';

const faqs = [
  {
    question: 'Do I need a GitHub token to use this?',
    answer: 'Only for GitHub-powered features — the stats/trophy/streak widgets embed public badge services directly, but the 3D contribution graph reads your real contribution calendar via the GitHub GraphQL API, which requires a GITHUB_TOKEN in the backend .env file.',
  },
  {
    question: 'How does the 3D contribution graph get into my README?',
    answer: 'Generate it from your live GitHub data, then hit "Capture & add to README" — the backend renders the scene headlessly and saves a PNG snapshot, which gets embedded as an image in your generated markdown.',
  },
  {
    question: 'Is my data sent anywhere?',
    answer: 'Requests go straight from this app to the GitHub API through your own backend. Nothing is stored beyond the local snapshot cache used to avoid re-rendering identical charts.',
  },
  {
    question: 'Can I save my progress and come back later?',
    answer: 'Yes — use "Download config" in the Configuration section to export a JSON file, then re-upload it any time to restore your title, skills, socials, and add-on selections.',
  },
  {
    question: 'What if a GitHub username has no public activity?',
    answer: 'The contribution graph will still render, just with mostly flat bars. Widgets like the stats card and trophy card work the same way for any public profile.',
  },
];

const FAQItem = ({ item, isOpen, onToggle }) => {
  return (
    <div className="panel-inset overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="font-medium text-slate-100">{item.question}</span>
        <span className={`shrink-0 text-brand-300 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      {isOpen && <p className="px-5 pb-4 text-sm leading-6 text-slate-400">{item.answer}</p>}
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="panel">
      <h2 className="text-xl font-semibold text-white">❓ Frequently Asked Questions</h2>
      <p className="mt-2 text-sm text-slate-400">Quick answers about how ReadmeForge works.</p>

      <div className="mt-6 space-y-3">
        {faqs.map((item, index) => (
          <FAQItem
            key={item.question}
            item={item}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQSection;

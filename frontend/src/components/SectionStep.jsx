const SectionStep = ({ number, id, children }) => {
  return (
    <div id={id} className="relative pl-12">
      <span className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-slate-900 text-xs font-bold text-brand-300">
        {number}
      </span>
      {children}
    </div>
  );
};

export default SectionStep;

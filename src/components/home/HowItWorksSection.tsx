const STEPS = [
  {
    number: "01",
    title: "Upload your textbooks",
    description: "An admin uploads PDFs, docs, or scanned books for each grade and subject — including Hindi content.",
  },
  {
    number: "02",
    title: "AI indexes the content",
    description: "Books are chunked and embedded into a searchable knowledge base, so answers can cite the exact page.",
  },
  {
    number: "03",
    title: "Students ask, instantly",
    description: "Students ask questions in plain English or Hindi and get streaming, cited answers — or generate a quiz.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="scroll-mt-24">
      <div className="mx-auto max-w-5xl px-space-lg py-space-xl">
        <div className="mb-space-lg text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-secondary">How it works</span>
          <h2 className="mt-2 font-headline text-2xl font-bold text-on-surface sm:text-3xl">
            From textbook to tutor in three steps
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-space-md sm:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.number} className="flex flex-col gap-space-xs rounded-2xl bg-surface-container-low p-space-md">
              <span className="font-code text-3xl font-bold text-primary/30">{step.number}</span>
              <h3 className="font-headline text-base font-semibold text-on-surface">{step.title}</h3>
              <p className="text-sm text-on-surface-variant">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';
import TourCoach from '@/components/TourCoach';

const steps = ['Paste text', 'Scan', 'Findings', 'Mask', 'Policy', 'Export'];

export default function TourPage() {
  return (
    <TourCoach steps={steps}>
      {({ step, stepTitle, steps, isFinished, next, prev, skip, restart }) => (
        <section className="p-8 space-y-6">
          <h1 className="text-3xl font-bold">Guided Product Tour</h1>
          <div className="grid grid-cols-3 gap-4">
            {steps.map((title, index) => (
              <div
                key={title}
                className={`p-4 border rounded text-center text-sm ${
                  index === step ? 'bg-emerald-50 border-emerald-500' : 'bg-white'
                }`}
              >
                {title}
              </div>
            ))}
          </div>
          {isFinished ? (
            <p className="text-sm">Tour complete.</p>
          ) : (
            <p className="text-sm">
              Step {step + 1} of {steps.length}: {stepTitle}
            </p>
          )}
          <div className="flex gap-2">
            <button
              className="px-2 py-1 border rounded"
              onClick={prev}
              disabled={step === 0}
            >
              Prev
            </button>
            <button
              className="px-2 py-1 border rounded"
              onClick={next}
              disabled={step >= steps.length - 1}
            >
              Next
            </button>
            <button className="px-2 py-1 border rounded" onClick={skip}>
              Skip
            </button>
            <button className="px-2 py-1 border rounded" onClick={restart}>
              Restart
            </button>
          </div>
          <p className="text-xs text-dark-400">Use ←/→ keys to navigate.</p>
        </section>
      )}
    </TourCoach>
  );
}


'use client';
import { useCallback, useEffect, useState, ReactNode } from 'react';

export type TourCoachRenderProps = {
  step: number;
  stepTitle: string;
  steps: string[];
  isFinished: boolean;
  next: () => void;
  prev: () => void;
  skip: () => void;
  restart: () => void;
};

interface TourCoachProps {
  steps: string[];
  storageKey?: string;
  children: (props: TourCoachRenderProps) => ReactNode;
}

export default function TourCoach({ steps, storageKey = 'tour-step', children }: TourCoachProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const stored = sessionStorage.getItem(storageKey);
    if (stored !== null) {
      const parsed = parseInt(stored, 10);
      if (!isNaN(parsed)) {
        setStep(parsed);
      }
    }
  }, [storageKey]);

  useEffect(() => {
    sessionStorage.setItem(storageKey, String(step));
  }, [step, storageKey]);

  const next = useCallback(() => {
    setStep((s) => Math.min(s + 1, steps.length));
  }, [steps.length]);

  const prev = useCallback(() => {
    setStep((s) => Math.max(s - 1, 0));
  }, []);

  const skip = useCallback(() => {
    setStep(steps.length);
  }, [steps.length]);

  const restart = useCallback(() => {
    setStep(0);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        next();
      } else if (e.key === 'ArrowLeft') {
        prev();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev]);

  const isFinished = step >= steps.length;
  const stepTitle = steps[step] ?? '';

  return <>{children({ step, stepTitle, steps, isFinished, next, prev, skip, restart })}</>;
}


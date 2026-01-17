'use client';
import { create } from 'zustand';

type Toast = { id: number; message: string };
type ToastStore = {
  toasts: Toast[];
  add: (message: string) => void;
};

export const useToasts = create<ToastStore>((set) => ({
  toasts: [],
  add: (message: string) =>
    set((s) => ({ toasts: [...s.toasts, { id: Date.now(), message }] })),
}));

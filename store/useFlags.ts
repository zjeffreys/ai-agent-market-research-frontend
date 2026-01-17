'use client';
import { create } from 'zustand';

type FlagsState = { showRaw: boolean; toggleRaw: () => void };

export const useFlags = create<FlagsState>((set) => ({
  showRaw: false,
  toggleRaw: () => set((s) => ({ showRaw: !s.showRaw }))
}));

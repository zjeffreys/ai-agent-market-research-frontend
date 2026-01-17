'use client';
import { create } from 'zustand';

type SessionState = {
  user: string | null;
  login: () => void;
  logout: () => void;
};

export const useMockSession = create<SessionState>((set) => ({
  user: null,
  login: () => set({ user: 'demo' }),
  logout: () => set({ user: null })
}));

'use client';
import { create } from 'zustand';

type BlueprintState = {
  approved: boolean;
  toggleApproval: () => void;
};

export const useBlueprint = create<BlueprintState>((set) => ({
  approved: false,
  toggleApproval: () => set((s) => ({ approved: !s.approved })),
}));

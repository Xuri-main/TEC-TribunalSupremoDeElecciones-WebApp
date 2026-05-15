import { create } from 'zustand';

export const useAccessStore = create((set) => ({
  fontSize: 18,
  highContrast: false,
  isDaltonic: false,
  language: 'es',
  
  incrementFont: () => set((state) => ({ fontSize: Math.min(state.fontSize + 2, 32) })),
  decrementFont: () => set((state) => ({ fontSize: Math.max(state.fontSize - 2, 14) })),
  toggleContrast: () => set((state) => ({ highContrast: !state.highContrast })),
  setLanguage: (lang) => set({ language: lang }),
}));
export type Mode = 'light' | 'dark' | 'system';

export interface ThemeProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
}
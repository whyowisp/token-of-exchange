export type Mode = 'light' | 'dark' | 'system';

export interface ThemeProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

export interface HeaderProps {
  title: string
}

export interface PageProps {
  title: string;
  content: React.ReactNode;
}
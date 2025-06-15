/* MUI Theme Customization */
declare module '@mui/material/styles' {
  interface Palette {
    thriving: Palette['primary']
    deprived: Palette['primary']
    deceased: Palette['primary']
    owner: Palette['primary']
    employee: Palette['primary']
    unemployed: Palette['primary']
  }

  interface PaletteOptions {
    thriving?: PaletteOptions['primary']
    deprived?: PaletteOptions['primary']
    deceased?: PaletteOptions['primary']
    owner?: PaletteOptions['primary']
    employee?: PaletteOptions['primary']
    unemployed?: PaletteOptions['primary']
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    owner: true
    employee: true
    unemployed: true
  }
}

declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsColorOverrides {
    thriving: true
    deprived: true
    deceased: true
  }
}

/* Theme Types */
export type Mode = 'light' | 'dark' | 'system'

export interface ThemeProps {
  mode: Mode
  setMode: (mode: Mode) => void
}

/* React Component Props */
export interface HeaderProps {
  title: string
}

export interface PageProps {
  title: string
  content: React.ReactNode
}
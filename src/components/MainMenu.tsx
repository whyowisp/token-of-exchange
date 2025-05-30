import React from 'react';
import { Switch, Button, Box, AppBar, Container, Typography, Toolbar, IconButton, Menu, MenuItem, FormControlLabel, useMediaQuery, useTheme } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import MaterialUISwitch from '../styles/MaterialUISwitch';

import type { ThemeProps } from '../types/theme'; import { Link, Router, Route, Routes, Link as RouterLink, BrowserRouter } from 'react-router';

const pages = ['/', 'simulation', 'contact'];

const MainMenu: React.FC<ThemeProps> = ({ mode, setMode }) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleThemeToggle = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters variant='dense'>
          {/* Logo for desktop */}
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TOKENOFEXCHANGE
          </Typography>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <Link to={page} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page == '/' ? 'home' : page}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>

          {/* Logo for mobile */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TOKENOFEXCHANGE
          </Typography>

          {/* Desktop menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link to={page}>
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ color: 'white', display: 'block' }}
                >
                  {page == '/' ? 'Home' : page}
                </Button>
              </Link>
            ))}
          </Box>

          {/* Theme toggle */}
          <MaterialUISwitch
            value={mode === 'dark'}
            onChange={handleThemeToggle}
            name="themeToggle"
            color="default"
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default MainMenu;
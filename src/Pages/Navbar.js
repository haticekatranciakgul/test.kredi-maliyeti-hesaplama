import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useContext } from "react";
import { ColorModeContext } from "../theme";
import { useTheme } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { Link } from "react-router-dom";


const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);


  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="xl">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            {/* <Sitemark /> */}
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button variant="text"
                sx={{ color: theme => theme.palette.mode === 'dark' ? 'white' : 'black' }}
                color="inherit" size="small">
                <Link to={`/hesapla`} style={{ textDecoration: 'none', color: 'inherit' }}>IRR HESAPLA</Link>
              </Button>
              <Button variant="text"
                sx={{ color: theme => theme.palette.mode === 'dark' ? 'white' : 'black' }}
                size="small">
                <Link to={`/hakkinda`} style={{ textDecoration: 'none', color: 'inherit' }}>HAKKINDA</Link>
              </Button>
              <Button variant="text"
                sx={{ color: theme => theme.palette.mode === 'dark' ? 'white' : 'black' }}
                color="inherit" size="small" >
                <Link to={`/sss`} style={{ textDecoration: 'none', color: 'inherit' }}>Sss</Link>
              </Button>
              <Button variant="text"
                sx={{ color: theme => theme.palette.mode === 'dark' ? 'white' : 'black' }}
                color="inherit" size="small" >
                <Link to={`/iletisim`} style={{ textDecoration: 'none', color: 'inherit' }}>İLETİŞİM</Link>
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "dark" ? (

                <LightModeOutlinedIcon />
              ) : (
                <DarkModeOutlinedIcon />
              )}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                <MenuItem>
                  <Link to={`/hesapla`} style={{ textDecoration: 'none', color: 'inherit' }}>IRR HESAPLA</Link>
                </MenuItem>
                <MenuItem>
                  <Link to={`/hakkinda`} style={{ textDecoration: 'none', color: 'inherit' }}>HAKKINDA</Link>
                </MenuItem>
                <MenuItem>
                  <Link to={`/sss`} style={{ textDecoration: 'none', color: 'inherit' }}>Sss</Link>
                </MenuItem>
                <MenuItem>
                  <Link to={`/iletisim`} style={{ textDecoration: 'none', color: 'inherit' }}>İLETİŞİM</Link>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
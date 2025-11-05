import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const pages = ['Admin', 'Productos', 'Categorias', 'Pedidos'];
const settings = ['Perfil', 'Cuenta', 'Cerrar sesión'];

function NavAdmin() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleClick = (select) => {
    if (select === "Productos") {
      navigate("/admin/productos");
    } else if (select === "Categorias") {
      navigate("/admin/categorias");
    } else if (select === "Admin") {
      navigate("/admin");
    } else if (select === "Pedidos") {
      navigate("/admin/pedidos");
    }
    handleCloseNavMenu();
  };

  const handleSettingClick = (setting) => {
    if (setting === "Cerrar sesión") {
      // Borrar el localStorage y redirigir al login
      localStorage.removeItem('isAdmin');
      navigate('/admin/login');
    } else if (setting === "Perfil") {
      // Por ahora no hace nada, después podés agregar una página de perfil
      console.log("Ir a perfil");
    } else if (setting === "Cuenta") {
      console.log("Ir a cuenta");
    }
    handleCloseUserMenu();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#a04202' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          <Box
            component="img"
            src="/assets/icon-home.ico"
            alt="Icono principal"
            sx={{ display: { xs: 'none', md: 'flex' }, width: 40, height: 40, mr: 1 }}
          />

          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate('/admin')}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            DY ADMIN
          </Typography>

          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              size="large"
              aria-label="menu"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => handleClick(page)}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            component="img"
            src="/assets/icono-cumpleañera.png"
            alt="Icono"
            sx={{ display: { xs: 'flex', md: 'none' }, width: 32, height: 32, mr: 1 }}
          />

          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => navigate('/admin')}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            ADMIN
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleClick(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <IconButton 
            onClick={() => navigate('/')}
            sx={{ color: 'white', mr: 2 }} 
            aria-label="Ir al sitio"
          >
            <ShoppingCartIcon />
          </IconButton>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Configuración">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Admin" src="/assets/icono-cumpleañera.png" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar-user"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem 
                  key={setting} 
                  onClick={() => handleSettingClick(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavAdmin;
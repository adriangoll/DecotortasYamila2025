import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
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
import CartContext from '../../contexts/CartContext';
import AuthContext from '../../contexts/AuthContext';

const pages = [
  { name: 'Inicio', path: '/' },
  { name: 'Categorías', path: '/categorias' },
  { name: 'Productos', path: '/productos' },
  { name: 'Contacto', path: '/contacto' },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { items } = useContext(CartContext);
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = async () => {
    try {
      await logout();
      handleCloseUserMenu();
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleLogin = () => {
    handleCloseUserMenu();
    navigate('/login');
  };

  const cartItemCount = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <AppBar position="static" sx={{ backgroundColor: '#f06292' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            src="/favicon-32x32.png"
            alt="Icono principal"
            sx={{ display: { xs: 'none', md: 'flex' }, width: 40, height: 40, mr: 1 }}
          />

          <Typography
            variant="h6"
            noWrap
            component={NavLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'white',
              textDecoration: 'none',
              paddingRight: '10px'
            }}
          >
            DECOTORTAS YAMILA
          </Typography>

          {/* Mostrar el botón de menú SOLO en pantallas pequeñas (xs - sm). Ocultar en md+ */}
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 2 }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
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
                  key={page.name}
                  component={NavLink}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            component="img"
            src="/favicon-32x32.png"
            alt="Icono"
            sx={{ display: { xs: 'flex', md: 'none' }, width: 32, height: 32, mr: 1 }}
          />

          <Typography
            variant="h5"
            noWrap
            component={NavLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            DECOTORTAS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={NavLink}
                to={page.path}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  '&.active': { borderBottom: '2px solid white' },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <IconButton
            component={NavLink}
            to="/carrito"
            sx={{ color: 'white', mr: 2 }}
            aria-label="Ver carrito"
          >
            <Badge badgeContent={cartItemCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={isAuthenticated ? user?.displayName || 'Usuario' : 'Iniciar sesión'}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar 
                  alt={user?.displayName || 'Usuario'} 
                  src={user?.photoURL || '/assets/icono-cumpleañera.png'}
                />
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
              {isAuthenticated ? (
                [
                  <MenuItem key="user-info" disabled>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Typography variant="body2" fontWeight="bold">
                        {user?.displayName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {user?.email}
                      </Typography>
                    </Box>
                  </MenuItem>,
                  <MenuItem key="perfil" onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Mi Perfil</Typography>
                  </MenuItem>,
                  <MenuItem key="pedidos" onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Mis Pedidos</Typography>
                  </MenuItem>,
                  <MenuItem key="logout" onClick={handleLogout}>
                    <Typography textAlign="center" color="error">
                      Cerrar Sesión
                    </Typography>
                  </MenuItem>
                ]
              ) : (
                <MenuItem onClick={handleLogin}>
                  <Typography textAlign="center">Iniciar Sesión</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
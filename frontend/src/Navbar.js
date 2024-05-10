import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import BookIcon from '@mui/icons-material/Book';
import { useNavigate } from 'react-router-dom';

const pages = ['Home', 'Add Task'];

function Navbar() {
    const navigate = useNavigate()

    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleClickNavMenu = () => {
        setAnchorElNav(null);
    };


    return (
        <AppBar color='default' position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <BookIcon sx={{ display: { xs: 'none', md: 'flex', color: '#f1356d' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: '#f1356d',
                            textDecoration: 'none',
                        }}
                    >
                        Todo App
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
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
                            onClose={handleClickNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleClickNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <BookIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
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
                        TaskHub
                    </Typography>
                    <Box sx={{ ml: 8, flexGrow: 2, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            size='large'
                            onClick={() => navigate("/")}
                            sx={{ my: 2, color: '#000000', '&:hover': { backgroundColor: '#3f51b5' }, display: 'block' }}
                        >
                            Home
                        </Button>
                        <Button
                            size='large'
                            onClick={() => navigate("/addtask")}
                            sx={{ my: 2, ml: 2, color: '#000000', '&:hover': { backgroundColor: '#3f51b5' }, display: 'block' }}
                        >
                            Add Task
                        </Button>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;
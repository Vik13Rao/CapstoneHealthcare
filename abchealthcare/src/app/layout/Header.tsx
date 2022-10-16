import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useStoreContext } from "../context/StoreContext";
import { useAppSelector } from "../store/configureStore";
import SignedInMenu from "./SignedInMenu";



const mLinks = [
    { title: 'medicines', path: '/catalog' },
    { title: 'about', path: '/about' },
    { title: 'contact', path: '/contact' }
]

const rLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' }
]

const navbarStyle = {
    color: 'warning',
    textDecoration: 'none',
    typography: 'h6',
    '&:hover': {
        color: 'warning.light'
    },
    '&.active': {
        color: 'grey.100'
    }
}



export default function Header() {
    const { cart } = useAppSelector(state => state.cart);
    const { user } = useAppSelector(state => state.account);
    const itemCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <AppBar position='static' sx={{ mb: 5, backgroundColor: 'white', color: 'warning', }} >
            <Toolbar sx={{display : 'flex', justifyContent: 'space-between', alignItems:'center'} }>

                <Box>
                    <Typography variant='h6' component={NavLink} to='/' exact sx={{

                        '&:hover': {
                            color: 'warning.light'
                        },
                        '&.active': {
                            color: 'grey.500'
                        },
                        typography: 'h6',
                    }}>
                        ABC Healthcare
                    </Typography>
                </Box>
               
                <List sx={{ display: 'flex' }}>
                    {mLinks.map(({ title, path }) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={{
                                color: 'warning',
                                '&:hover': {
                                    color: 'warning.light'
                                },
                                '&.active': {
                                    color: 'grey.500'
                                },
                                typography: 'h6',
                            }}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                    {user && user.roles?.includes('Admin') &&
                        <ListItem
                            component={NavLink}
                            to={'/inventory'}

                            sx={{
                                color: 'warning',
                                '&:hover': {
                                    color: 'warning.light'
                                },
                                '&.active': {
                                    color: 'grey.500'
                                },
                                typography: 'h6',
                            }}
                        >
                            INVENTORY
                        </ListItem>}

                   
                </List>

                <Box display='flex' alignItems='center'>
                    <IconButton component={Link} to='/cart' size='large' sx={{ color: 'secondary' }}>
                    <Badge badgeContent={itemCount} color='secondary'>
                        <ShoppingCart />
                    </Badge>
                    </IconButton>

                    {user ? (
                       <SignedInMenu />
                    ) : (
                            <List sx={{ display: 'flex' }}>
                                {rLinks.map(({ title, path }) => (
                                    <ListItem
                                        component={NavLink}
                                        to={path}
                                        key={path}
                                        sx={{
                                            color: 'warning',
                                            '&:hover': {
                                                color: 'warning.light'
                                            },
                                            '&.active': {
                                                color: 'grey.500'
                                            },
                                            typography: 'h6',
                                        }}
                                    >
                                        {title.toUpperCase()}
                                    </ListItem>
                                ))}
                            </List> 
                        )}

                
                </Box>
               
            </Toolbar>
            
        </AppBar>    
    )
}
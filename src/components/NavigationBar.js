import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { useNavigation } from 'react-router-dom';

const drawerWidth = 240;


class NavigationBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: false,
            container: window !== undefined ? () => window().document.body : undefined
        };
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    }

    handleDrawerToggle() {
        this.setState({
            mobileOpen: !this.state.mobileOpen
        });
    };

    render() {

        const drawer = (
            <div>
                <Toolbar />
                <Divider />
                <List>
                    <ListItem key='shops' disablePadding >
                        <ListItemButton onClick={() => {
                            this.props.navigation('/shops');
                        
                            this.setState({
                                mobileOpen: false
                            });
                        }}>
                            <ListItemIcon>
                                <LocalGroceryStoreIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Shops'} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </div>
        );


        return (
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"

                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                    }}
                >
                    <Toolbar onClick={() => {
                        this.props.navigation('/');
                    }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={this.handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Larionov U02
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    <Drawer
                        variant="temporary"
                        open={this.state.mobileOpen}
                        onClose={this.handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                    <Toolbar />

                    {this.props.content}
                </Box>
            </Box>
        );
    }



}



export default NavigationBar;

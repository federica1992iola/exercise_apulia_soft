import React from "react";
import {IPage, drawerWidth } from "../common/Common";
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import { CssBaseline,  Toolbar, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CustomDrawer from "./CustomDrawer";

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open'})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
}));


  
export default function Sidenav() {
    const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);
    const [allPages] = React.useState<IPage[]>(
        [   {icon: 'home', name: 'home', route: '/home'},
            {icon: 'star', name: 'Favorites', route: '/favorites'}
        ]
    );

    const onDrawerOpenChange = (isOpen: boolean) => {
        setOpenDrawer(isOpen);
    }

    return <>
        <div style={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={openDrawer}>
                <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => onDrawerOpenChange(true)}
                    edge="start"
                    sx={{ mr: 2, ...(openDrawer && { display: 'none' }) }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    Persistent drawer
                </Typography>
                </Toolbar>
            </AppBar>
            <CustomDrawer page={allPages} isOpen={openDrawer} onDrawerOpenChange={onDrawerOpenChange}/>
        </div>
    </>
}
  
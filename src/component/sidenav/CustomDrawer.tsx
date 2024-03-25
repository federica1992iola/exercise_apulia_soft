import { styled, useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import {List, ListItem, ListItemButton, ListItemIcon, Icon, ListItemText, SwipeableDrawer, IconButton } from "@mui/material";
import React from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { IPage, Anchor, DrawerState, drawerWidth } from "../common/Common";
import Box from '@mui/material/Box'

export interface IDrawerProps {
    page: IPage[],
    isOpen: boolean,
    onDrawerOpenChange: (isOpen: boolean) => void
}

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));
  
export default function CustomDrawer({page, isOpen, onDrawerOpenChange} : IDrawerProps) {
    const theme = useTheme();
    const anchorType: Anchor = "left";

    const [anchor, setAnchor] = React.useState<DrawerState>({left: false});
    

    React.useEffect(() => {
        setAnchor({ [anchorType]: isOpen });
    }, [isOpen]);

    const toggleDrawer = (anchor: Anchor, isOpen: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event &&
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
  
        setAnchor({[anchor]: isOpen });
        onDrawerOpenChange(isOpen);
       
      };
  
    const list = (anchor: Anchor) => (
      <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          { page.map((page: IPage, index: number) => ( 
            <ListItem key={`${page.name}-${index}`} disablePadding component={Link} to={page.route}>
              <ListItemButton>
                <ListItemIcon>
                <Icon>{page.icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={page.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );
  
    return (
            <SwipeableDrawer
                sx={{ width: drawerWidth, flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                    }
                }}
              anchor={anchorType}
              open={anchor[anchorType]}
              onClose={toggleDrawer(anchorType, false)}
              onOpen={toggleDrawer(anchorType, true)}
            >
            <DrawerHeader>
                <IconButton onClick={toggleDrawer(anchorType, false)}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </DrawerHeader>
            {list(anchorType)}
            </SwipeableDrawer>
      
    );
}

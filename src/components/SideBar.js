import React from "react";
import { Drawer, List, ListItem, ListItemText, Divider, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import BoxIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';

const SideBar = ({ open, toggleSidebar, user }) => {
  if (!user) return null; 

  return (
    <>
      {/* Botón de apertura */}
      <IconButton onClick={toggleSidebar} style={{ color: 'white' }}>
        <MenuIcon />
      </IconButton>

      {/* Drawer del sidebar */}
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleSidebar} 
        sx={{
          '& .MuiDrawer-paper': {
            width: 250, 
            backgroundColor: '#333',
            color: '#fff', 
            paddingTop: '10px',
            boxShadow: 4,
          },
        }}
      >
        <div style={{ width: 250 }}>
          <List>
            {/* Item de Inicio */}
            <ListItem button component={Link} to="/" onClick={toggleSidebar}>
              <HomeIcon style={{ marginRight: '10px', color: '#fff' }} />
              <ListItemText primary="Inicio"/>
            </ListItem>
            
            {/* Item de Productos */}
            <ListItem button component={Link} to="/products" onClick={toggleSidebar}>
              <BoxIcon style={{ marginRight: '10px', color: '#fff' }} />
              <ListItemText primary="Productos" />
            </ListItem>

            {/* Mostrar Usuarios solo si es admin */}
            {user.role === "admin" && (
              <ListItem button component={Link} to="/users" onClick={toggleSidebar}>
                <PeopleIcon style={{ marginRight: '10px', color: '#fff' }} />
                <ListItemText primary="Usuarios" />
              </ListItem>
            )}
          </List>
          <Divider sx={{ backgroundColor: '#444' }} />
        </div>
      </Drawer>
    </>
  );
};

export default SideBar;

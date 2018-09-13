import React, { Component } from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { PowerSettingsNew, Person, Home, Dashboard, MeetingRoom, People } from '@material-ui/icons';
import { Link } from 'react-router-dom';

class DrawerControl extends Component {
  
  render () {
    return (
      <div>
        <List>
          <ListItem button>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="Members" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <MeetingRoom />
            </ListItemIcon>
            <ListItemText primary="Rooms" />
          </ListItem>
        </List>
        <List>
          <ListItem button href="" color="inherit" onClick={() => this.props.auth.logout('/login')}>
            <ListItemIcon>
              <PowerSettingsNew />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
          <ListItem button component={Link} to="/profile">
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </List>
      </div>
    )
  }
}

export default DrawerControl;

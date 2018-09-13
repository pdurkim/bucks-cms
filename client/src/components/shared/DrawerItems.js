import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MeetingRoom from '@material-ui/icons/MeetingRoom';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import { PowerSettingsNew, PersonAdd, Person } from '@material-ui/icons';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Members" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <MeetingRoom />
      </ListItemIcon>
      <ListItemText primary="Rooms" />
    </ListItem>
  </div>
);

export const LoggedInItems = (props) => {
  return (
    <div>
      <ListItem button href="" color="inherit" onClick={() => props.auth.logout('/login')}>
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
    </div>
  )
};

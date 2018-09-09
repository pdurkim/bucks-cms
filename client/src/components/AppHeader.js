import React from 'react';
import Navigation from './shared/Navigation';
import { AppBar } from '@material-ui/core';

const AppHeader = () => (
  <AppBar position="static">
    <Navigation />
  </AppBar>
);

export default AppHeader;

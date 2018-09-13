import React from 'react';
import {
  Typography,
} from '@material-ui/core';
import Layout from '../shared/Layout';

export default class HomePage extends React.Component {
  render() {
    return (
      <Layout>
        <Typography variant="display1">This is home</Typography>
      </Layout>
    );
  }
}

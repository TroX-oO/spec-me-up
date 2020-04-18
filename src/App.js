import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Home from './containers/Home';
import SpecContainer from './containers/spec/SpecContainer';

const Page = styled(Box)`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Content = styled(Box)`
  width: 100%;
  height: calc(100% - 64px);
`;

const AppName = styled(Link)`
  color: inherit;
  text-decoration: inherit;
`;

const SubHeader = styled.span`
  font-size: 40%;
  margin-left: 10px;
`;

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Page>
        <AppBar position="relative">
          <Toolbar variant="regular">
            <Typography variant="h4" color="inherit">
              <AppName to="/">
                Spec Me Up<SubHeader>Before you no go</SubHeader>
              </AppName>
            </Typography>
          </Toolbar>
        </AppBar>

        <Content>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/spec/:specId">
              <SpecContainer />
            </Route>
          </Switch>
        </Content>
      </Page>
    </Router>
  );
}

export default App;

import React from 'react';
import Home from './containers/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from 'react-router-dom';
import { createBrowserHistory } from 'history';

import styled from 'styled-components';

import SpecContainer from './containers/spec/SpecContainer';

const Page = styled.div`
  position: absolute;
  background: #eee;
  width: 100%;
  height: 100%;
`;

const Header = styled.h1`
  color: #333;
  text-align: center;
`;

const SubHeader = styled.span`
  color: #333;
  font-size: 40%;
  margin-left: 10px;
`;

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Page>
        <Header onClick={() => history.goBack()}>
          Spec Me Up<SubHeader>Before you no go</SubHeader>
        </Header>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/spec/:specId">
            <SpecContainer />
          </Route>
        </Switch>
      </Page>
    </Router>
  );
}

export default App;

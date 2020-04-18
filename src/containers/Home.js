import React, { useState, useCallback, useRef, useMemo } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createEditor, Transforms, Editor, Range } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

import { createSpecProject } from '../actions/spec';
import SpecListContainer from './speclist/SpecListContainer';

const HomeContainer = styled(Box)`
  margin: 50px auto 0 auto;
  padding: 10px;
  width: 900px;
`;

const ProjectPanel = styled(Paper)`
  display: flex;
  width: 100%;
`;

const CreateProjectCollapse = styled(Collapse)`
  margin-left: 10px;

  .collapse form > * {
    margin: 5px 0;
  }
`;

const GridItem = styled(Grid)`
  ${(props) => (props.alignCenter ? 'text-align: center;' : '')}
`;

const Home = (props) => {
  const [showCreateInput, setShowCreateInput] = React.useState(false);
  const [name, setName] = React.useState('');

  const handleCreateProjectClicked = () => {
    setShowCreateInput((prev) => !prev);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.createSpecProject(name);
    setShowCreateInput(false);
  };

  return (
    <HomeContainer>
      <Grid container spacing={3}>
        <GridItem item xs={9}>
          <Typography variant="h5">Your projects</Typography>
          <Divider style={{ marginBottom: 10, marginTop: 10 }} />
          <CreateProjectCollapse
            in={showCreateInput}
            classes={{ wrapperInner: 'collapse' }}
          >
            <Typography variant="h6">Create new project</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                id="spec-name"
                label="Project name"
                value={name}
                onChange={handleNameChange}
                fullWidth
              />
              <Button variant="contained" color="primary" type="submit">
                Create
              </Button>
            </form>
          </CreateProjectCollapse>
        </GridItem>
        <GridItem item xs={3}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleCreateProjectClicked}
          >
            Create project
          </Button>
        </GridItem>

        <ProjectPanel>
          <GridItem item xs={12} style={{ padding: 0 }}>
            <SpecListContainer />
          </GridItem>
        </ProjectPanel>
      </Grid>
    </HomeContainer>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createSpecProject: (name) => dispatch(createSpecProject(name))
  };
};

export default connect(null, mapDispatchToProps)(Home);

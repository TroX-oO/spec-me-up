import React, { useState, useCallback, useRef, useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createEditor } from 'slate';
import { withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import ContentEditable from 'react-contenteditable';

import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import DescriptionIcon from '@material-ui/icons/Description';

import ResourceNotFound from '../../components/ResourceNotFound';
import FixMeListContainer from '../fixme/FixMeListContainer';
import SlateEditorContainer from '../editor/SlateEditorContainer';

import { renameSpecProject } from '../../actions/spec';

const DrawerWidth = 500;

const Container = styled(Box)`
  display: flex;
  height: 100%;
`;

const Content = styled(Box)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-right: 0;
  height: 100%;
  ${(props) =>
    `
    transition: ${props.theme.transitions.create('margin', {
      easing: props.theme.transitions.easing.sharp,
      duration: props.theme.transitions.duration.leavingScreen
    })};
  `}

  ${(props) =>
    props.contentShift &&
    `
    transition: ${props.theme.transitions.create('margin', {
      easing: props.theme.transitions.easing.easeOut,
      duration: props.theme.transitions.duration.enteringScreen
    })};
    margin-right: -${DrawerWidth}px;
  `}
`;

const FixMeDrawer = styled(Drawer)`
  &.MuiDrawer-docked {
    flex-shrink: 0;
    width: ${DrawerWidth}px;
    height: 100%;
    overflow: hidden;
  }

  .MuiDrawer-paper {
    position: relative;
    width: ${DrawerWidth}px;
    height: 100%;
  }
`;

const ProjectName = styled(Typography)`
  background-color: white;
  display: flex;
  align-items: center;
  padding: 10px;
`;

const Name = styled(ContentEditable)`
  flex: 1;
  margin-right: 10px;
  border: 1px solid transparent;

  &:hover {
    border: 1px solid #cecece;
  }
`;

const withFixMe = (editor) => {
  const { isInline, isVoid } = editor;

  editor.isInline = (element) => {
    return element.type === 'fixme' ? true : isInline(element);
  };

  editor.isVoid = (element) => {
    return element.type === 'fixme' ? true : isVoid(element);
  };

  return editor;
};

const SpecContainer = (props) => {
  const { specId } = props.match.params;
  const theme = useTheme();
  const [selectedFixMe, setSelectedFixMe] = useState(null);
  const [open, setOpen] = useState(true);
  const newNameRef = useRef(props.spec ? props.spec.name : null);
  const editor = useMemo(
    () => withFixMe(withHistory(withReact(createEditor()), [])),
    []
  );
  const onFixMeSelected = useCallback((id) => {
    setSelectedFixMe(id);
    if (id) {
      setOpen(true);
    }
  }, []);

  const handleDrawerToggle = () => {
    setOpen((prev) => !prev);
  };
  const handleNameChange = (evt) => {
    newNameRef.current = evt.target.value;
  };
  const handleNameBlur = () => {
    props.renameProject(specId, newNameRef.current);
  };

  if (!props.spec) {
    return <ResourceNotFound />;
  }

  return (
    <Container>
      <Content theme={theme} contentShift={!open}>
        <ProjectName variant="h5">
          <DescriptionIcon fontSize="large" color="primary" />
          <Name
            contenteditable="true"
            html={newNameRef.current}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
          ></Name>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDrawerToggle}
          >
            {open ? 'Hide' : 'Show'} FixMes
          </Button>
        </ProjectName>
        <SlateEditorContainer
          specId={specId}
          editor={editor}
          content={props.spec.content}
          onFixMeSelected={onFixMeSelected}
        />
        <div>Selected FixMe: {selectedFixMe}</div>
      </Content>
      <FixMeDrawer variant="persistent" anchor="right" open={open}>
        <FixMeListContainer
          specId={specId}
          selected={selectedFixMe}
          onFixMeSelected={onFixMeSelected}
        />
      </FixMeDrawer>
    </Container>
  );
};

const mapStateToProps = (state, props) => {
  return {
    spec: state.specs[props.match.params.specId]
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    renameProject: (id, name) => dispatch(renameSpecProject(id, name))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SpecContainer)
);

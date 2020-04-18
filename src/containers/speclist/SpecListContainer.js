import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { isEmpty, map } from 'lodash';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemText from '@material-ui/core/ListItemText';

import { removeSpecProject } from '../../actions/spec';

const ProjectLink = styled(Link)`
  flex: 1;
  color: inherit;
  text-decoration: inherit;
`;

const renderSpecList = (specs, onClick) => {
  let first = true;

  return (
    <List>
      {isEmpty(specs) ? (
        <ListItem dense>
          <Typography style={{ margin: 'auto' }}>No projects found</Typography>
        </ListItem>
      ) : (
        map(specs, (s) => {
          const jsx = (
            <React.Fragment key={s.id}>
              {!first && <Divider />}
              <ListItem dense button>
                <ProjectLink to={`/spec/${s.id}`}>
                  <ListItemText>{s.name}</ListItemText>
                </ProjectLink>
                <IconButton
                  aria-label="delete"
                  color="primary"
                  onClick={onClick(s.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            </React.Fragment>
          );

          first = false;

          return jsx;
        })
      )}
    </List>
  );
};

const SpecListContainer = (props) => {
  const handleRemoveClick = (id) => () => {
    props.removeProject(id);
  };
  return renderSpecList(props.specs, handleRemoveClick);
};

const mapStateToProps = (state) => {
  return {
    specs: state.specs
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeProject: (id) => dispatch(removeSpecProject(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecListContainer);

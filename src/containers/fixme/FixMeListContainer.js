import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { v4 } from 'uuid';
import { filter, isEmpty, map } from 'lodash';

import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { removeFixMe } from '../../actions/fixme';

const FixMeLink = styled(Link)`
  flex: 1;
  color: inherit;
  text-decoration: inherit;
`;

const renderFixMeListItem = (
  fixme,
  onClick,
  onRemoveClick,
  selected,
  first
) => {
  const jsx = (
    <React.Fragment key={fixme.id}>
      <ExpansionPanel expanded={selected} onChange={onClick(fixme.id)}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="fixme-content"
          id={`fixme-${fixme.id}-header`}
        >
          {fixme.title}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            {fixme.title}
            {fixme.title}
            {fixme.title}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </React.Fragment>
  );

  return jsx;
};
const renderFixMeList = (fixmes, onClick, onRemoveClick, selected) => {
  let first = true;

  return isEmpty(fixmes) ? (
    <ListItem dense>
      <Typography style={{ margin: 'auto' }}>No FixMes found</Typography>
    </ListItem>
  ) : (
    map(fixmes, (s) => {
      const isSelected = s.id === selected;
      const jsx = renderFixMeListItem(
        s,
        onClick,
        onRemoveClick,
        isSelected,
        first
      );

      first = false;

      return jsx;
    })
  );
};

const FixMeListContainer = (props) => {
  const handleRemoveClick = (id) => () => {
    props.removeFixMe(id);
  };
  const handleClick = (id) => (event, isExpanded) => {
    props.onFixMeSelected(isExpanded ? id : null);
  };
  return (
    <Paper>
      {renderFixMeList(
        props.fixmes,
        handleClick,
        handleRemoveClick,
        props.selected
      )}
    </Paper>
  );
};

const mapStateToProps = (state, props) => {
  return {
    fixmes: filter(state.fixmes, (f) => f.specId === props.specId)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFixMe: (id) => dispatch(removeFixMe(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FixMeListContainer);

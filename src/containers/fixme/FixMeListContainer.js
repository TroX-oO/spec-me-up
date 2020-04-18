import React from 'react';
import { connect } from 'react-redux';
import { filter, isEmpty, map } from 'lodash';

import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';

import { removeFixMe } from '../../actions/fixme';

const renderFixMeListItem = (fixme, onClick, onRemoveClick, selected) => {
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
            <Button
              aria-label="delete"
              variant="contained"
              color="primary"
              startIcon={<DeleteIcon />}
              onClick={onRemoveClick(fixme.id)}
            >
              Remove
            </Button>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </React.Fragment>
  );

  return jsx;
};
const renderFixMeList = (fixmes, onClick, onRemoveClick, selected) => {
  return isEmpty(fixmes) ? (
    <ListItem dense>
      <Typography style={{ margin: 'auto' }}>No FixMes found</Typography>
    </ListItem>
  ) : (
    map(fixmes, (s) => {
      const isSelected = s.id === selected;
      const jsx = renderFixMeListItem(s, onClick, onRemoveClick, isSelected);

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

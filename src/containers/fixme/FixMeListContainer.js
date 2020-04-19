import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { filter, isEmpty, map } from 'lodash';

import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

import FixMeItemContainer from './FixMeItemContainer';

const renderFixMeList = (fixmes, onClick, onRemoveClick, selected) => {
  return isEmpty(fixmes) ? (
    <ListItem dense>
      <Typography style={{ margin: 'auto' }}>No FixMes found</Typography>
    </ListItem>
  ) : (
    map(fixmes, (s) => {
      const isSelected = s.id === selected;

      return (
        <FixMeItemContainer
          fixMeId={s.id}
          onClick={onClick(s.id)}
          selected={isSelected}
        />
      );
    })
  );
};

const FixMeListContainer = (props) => {
  const handleRemoveClick = useCallback(
    (id) => () => {
      props.removeFixMe(id);
    },
    []
  );
  const handleClick = useCallback(
    (id) => (event, isExpanded) => {
      props.onFixMeSelected(isExpanded ? id : null);
    },
    []
  );

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

export default connect(mapStateToProps)(FixMeListContainer);

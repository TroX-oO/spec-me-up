import React, { useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { filter, find, map } from 'lodash';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircle from '@material-ui/icons/CheckCircle';

import {
  removeComment,
  validateComment,
  invalidateComment
} from '../../actions/fixme';

const Header = styled(Box)`
  width: 100%;
  display: flex;
`;

const Comment = styled(ListItem)`
  flex-direction: column;
  margin-left: 5px;
`;

const FromText = styled(Typography)`
  flex: 1;
`;

const Message = styled(Box)`
  align-self: flex-start;
  border-left: 2px solid #d8d8d8;
  padding-left: 5px;
`;

const ValidationIcon = styled(CheckCircle)`
  color: ${(props) => (props.validated ? 'green' : 'gray')};
`;

const CommentListContainer = (props) => {
  const handleRemoveClick = (id) => () => {
    props.removeComment(id);
  };
  const handleValidateClick = (id) => () => {
    props.validateComment(id);
  };
  const handleInvalidateClick = (id) => () => {
    props.invalidateComment(id);
  };

  return (
    <React.Fragment>
      {map(props.comments, (c) => (
        <Comment>
          <Header>
            <FromText>From: {c.from}</FromText>
            <IconButton
              aria-label="delete"
              color="primary"
              onClick={handleRemoveClick(c.id)}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              aria-label="validate"
              color="primary"
              onClick={
                c.validated
                  ? handleInvalidateClick(c.id)
                  : handleValidateClick(c.id)
              }
            >
              <ValidationIcon validated={c.validated} />
            </IconButton>
          </Header>
          <Message>
            <Typography>{c.message}</Typography>
          </Message>
        </Comment>
      ))}
    </React.Fragment>
  );
};

const mapStateToProps = (state, props) => {
  console.error('map ?');
  console.log(props);
  return {
    comments: filter(state.comments, (c) => c.fixMeId === props.fixMeId)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    removeComment: (commentId) =>
      dispatch(removeComment(props.fixMeId, commentId)),
    validateComment: (commentId) =>
      dispatch(validateComment(props.fixMeId, commentId)),
    invalidateComment: (commentId) =>
      dispatch(invalidateComment(props.fixMeId, commentId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentListContainer);

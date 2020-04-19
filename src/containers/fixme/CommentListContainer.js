import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import { filter, map } from 'lodash';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

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
`;

const FromText = styled(Typography)`
  display: flex;
  align-items: center;
`;

const Time = styled(Typography)`
  flex: 1;
  font-size: 50%;
  color: lightgray;
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

const ScrollContainer = styled.div`
  max-height: 200px;
  overflow-y: auto;
`;

const Message = styled(Box)`
  align-self: flex-start;
  border-left: 2px solid #d8d8d8;
  padding-left: 5px;
  white-space: pre-wrap;
`;

const ValidationIcon = styled(CheckCircle)`
  color: ${(props) => (props.validated ? 'green' : 'gray')};
`;

const CommentListContainer = (props) => {
  const scrollRef = useRef(null);
  const handleRemoveClick = (id) => () => {
    props.removeComment(id);
  };
  const handleValidateClick = (id) => () => {
    props.validateComment(id);
  };
  const handleInvalidateClick = (id) => () => {
    props.invalidateComment(id);
  };

  useEffect(() => {
    console.log(scrollRef.current);
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [props.comments]);

  return (
    <ScrollContainer ref={scrollRef}>
      {map(props.comments, (c) => (
        <>
          <Divider />
          <Comment disableGutters>
            <Header>
              <FromText>{c.from}:</FromText>
              <Time variant="caption">{moment(c.createAt).fromNow()}</Time>
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
        </>
      ))}
    </ScrollContainer>
  );
};

const mapStateToProps = (state, props) => {
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

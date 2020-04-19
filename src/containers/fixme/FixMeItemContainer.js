import React, { useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { filter, find } from 'lodash';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';

import { removeFixMe, addComment } from '../../actions/fixme';

import CommentListContainer from './CommentListContainer';

const ExpansionPanelDetailsContainer = styled(ExpansionPanelDetails)`
  display: flex;
  flex-direction: column;
`;
const AddCommentForm = styled.form`
  display: flex;
  margin: 10px 0;
`;

const FixMeItemContainer = (props) => {
  const { fixme, comments, selected } = props;
  console.log(fixme);
  const commentInputRef = useRef(null);

  const handleRemoveClick = (e) => {
    props.removeFixMe();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(commentInputRef.current.value);
    props.addComment(commentInputRef.current.value);
    commentInputRef.current.value = '';
  };

  return (
    <React.Fragment>
      <ExpansionPanel expanded={selected} onChange={props.onClick}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="fixme-content"
          id={`fixme-${fixme.id}-header`}
        >
          {fixme.title}
        </ExpansionPanelSummary>
        <ExpansionPanelDetailsContainer>
          <CommentListContainer fixMeId={fixme.id} />
          <AddCommentForm onSubmit={handleSubmit}>
            <TextField
              inputRef={commentInputRef}
              style={{ flex: 1, marginRight: 5 }}
              id="add-comment"
              label="Comment"
              multiline
            />
            <Button
              style={{ alignSelf: 'flex-end' }}
              variant="contained"
              color="primary"
              type="submit"
            >
              Add
            </Button>
          </AddCommentForm>
          <Button
            style={{ alignSelf: 'flex-start' }}
            aria-label="delete"
            color="primary"
            startIcon={<DeleteIcon />}
            onClick={handleRemoveClick}
          >
            Remove
          </Button>
        </ExpansionPanelDetailsContainer>
      </ExpansionPanel>
    </React.Fragment>
  );
};

const mapStateToProps = (state, props) => {
  console.error('map ?');
  console.log(props);
  return {
    fixme: find(state.fixmes, (f) => f.id === props.fixMeId),
    comments: filter(state.comments, (c) => c.fixMeId === props.fixMeId)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    removeFixMe: () => dispatch(removeFixMe(props.fixMeId)),
    addComment: (comment) => dispatch(addComment(props.fixMeId, comment))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FixMeItemContainer);

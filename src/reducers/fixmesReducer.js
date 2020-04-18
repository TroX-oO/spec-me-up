import { filter } from 'lodash';

import { FixMeActions } from '../types/actions/fixme';
import { SpecActions } from '../types/actions/spec';

export default (state = {}, action) => {
  switch (action.type) {
    case FixMeActions.CREATE:
      // Create a FixMe
      return {
        ...state,
        [action.fixMeId]: {
          id: action.fixMeId,
          specId: action.specId,
          title: action.title,
          createAt: Date.now(),
          comments: []
        }
      };
    case FixMeActions.REMOVE:
      // Remove a project by id
      return filter(state, (fixMe) => fixMe.id !== action.fixMeId);
    case FixMeActions.ADD_COMMENT:
      // Attach the commentId to the FixMe
      return {
        ...state,
        [action.specId]: {
          ...state[action.specId],
          comments: [...state[action.specId].comments, action.commentId]
        }
      };
    case FixMeActions.REMOVE_COMMENT:
      // Detach the commentId to the FixMe
      return {
        ...state,
        [action.specId]: {
          ...state[action.specId],
          comments: filter(
            state[action.specId].comments,
            (commentId) => commentId !== action.commentId
          )
        }
      };
    case SpecActions.REMOVE_PROJECT:
      // Remove ALL FixMe attached to specId
      return filter(state, (fixme) => fixme.specId !== action.specId);
    default:
      return state;
  }
};

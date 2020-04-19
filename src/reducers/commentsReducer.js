import { each, pickBy } from 'lodash';

import { FixMeActions } from '../types/actions/fixme';
import { SpecActions } from '../types/actions/spec';

export default (state = {}, action) => {
  let newState = null;
  switch (action.type) {
    case FixMeActions.ADD_COMMENT:
      // Add a comment
      return {
        ...state,
        [action.commentId]: {
          id: action.commentId,
          specId: action.specId,
          fixMeId: action.fixMeId,
          createAt: Date.now(),
          from: 'Anonymous',
          message: action.message,
          validated: false
        }
      };
    case FixMeActions.REMOVE_COMMENT:
      // Remove a comment by id
      return pickBy(state, (c) => c.id !== action.commentId);
    case FixMeActions.VALIDATE_COMMENT:
      // Validate a comment
      newState = {
        ...state,
        [action.commentId]: {
          ...state[action.commentId],
          validated: true
        }
      };

      each(newState, (c, id) => {
        if (id !== action.commentId && c.fixMeId === action.fixMeId) {
          c.validated = false;
        }
      });

      return newState;
    case FixMeActions.INVALIDATE_COMMENT:
      // Invalidate a comment
      return {
        ...state,
        [action.commentId]: {
          ...state[action.commentId],
          validated: false
        }
      };
    case FixMeActions.REMOVE:
      // Remove comments when a FixMe is removed
      return pickBy(state, (c) => c.fixMeId !== action.fixMeId);
    case SpecActions.REMOVE_PROJECT:
      // Remove ALL Fixmes attached to specId
      return pickBy(state, (c) => c.specId !== action.specId);
    default:
      return state;
  }
};

import { filter } from 'lodash';

import { FixMeActions } from '../types/actions/fixme';
import { SpecActions } from '../types/actions/spec';

export default (state = {}, action) => {
  switch (action.type) {
    case FixMeActions.ADD_COMMENT:
      // Add a comment
      return {
        ...state,
        [action.commentId]: {
          id: action.commentId,
          specId: action.specId,
          fixMeId: action.fixMeId,
          message: action.message,
          validated: false
        }
      };

    case FixMeActions.REMOVE_COMMENT:
      // Remove a comment by id
      return filter(state, (comment) => comment.id !== action.commentId);
    case FixMeActions.REMOVE:
      // Remove comments when a FixMe is removed
      return filter(state, (comment) => comment.fixMeId !== action.fixMeId);
    case SpecActions.REMOVE_PROJECT:
      // Remove ALL Comments attached to specId
      return filter(state, (fixme) => fixme.specId !== action.specId);
    default:
      return state;
  }
};

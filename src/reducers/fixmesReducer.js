import { filter, pickBy } from 'lodash';

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
      // Remove a fixme by id
      return pickBy(state, (fixMe) => fixMe.id !== action.fixMeId);
    case FixMeActions.ADD_COMMENT:
      // Attach the commentId to the FixMe
      return {
        ...state,
        [action.fixMeId]: {
          ...state[action.fixMeId],
          comments: [...state[action.fixMeId].comments, action.commentId]
        }
      };
    case FixMeActions.REMOVE_COMMENT:
      // Detach the commentId to the FixMe
      return {
        ...state,
        [action.fixMeId]: {
          ...state[action.fixMeId],
          comments: filter(
            state[action.fixMeId].comments,
            (commentId) => commentId !== action.commentId
          )
        }
      };
    case SpecActions.REMOVE_PROJECT:
      // Remove ALL FixMe attached to specId
      return pickBy(state, (fixme) => fixme.specId !== action.specId);
    default:
      return state;
  }
};

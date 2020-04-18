import { filter } from 'lodash';

import { SpecActions } from '../types/actions/spec';
import { FixMeActions } from '../types/actions/fixme';

export default (state: Object = {}, action: Object) => {
  switch (action.type) {
    case SpecActions.CREATE_PROJECT:
      // Create a project
      return {
        ...state,
        [action.specId]: {
          id: action.specId,
          name: action.name,
          createAt: Date.now(),
          fixmes: [],
          content: null
        }
      };
    case SpecActions.REMOVE_PROJECT:
      // Remove a project by id
      return filter(state, (spec) => spec.id !== action.specId);
    case SpecActions.RENAME_PROJECT:
      // Rename project
      return {
        ...state,
        [action.specId]: {
          ...state[action.specId],
          name: action.name
        }
      };
    case SpecActions.SET_CONTENT:
      // Set project content
      return {
        ...state,
        [action.specId]: {
          ...state[action.specId],
          content: action.content
        }
      };
    case FixMeActions.CREATE:
      // Attach Fixme to spec
      return {
        ...state,
        [action.specId]: {
          ...state[action.specId],
          fixmes: [...state[action.specId].fixmes, action.fixMeId]
        }
      };
    default:
      return state;
  }
};

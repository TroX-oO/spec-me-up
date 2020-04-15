// @flow
import { SpecActions } from '../types/actions/spec';

export default (state: Object = {}, action: Object) => {
  switch (action.type) {
    case SpecActions.CREATE_SPEC_PROJECT:
      return {
        ...state,
        [action.id]: { name: action.name, fixmes: [] }
      };
    default:
      return state;
  }
};

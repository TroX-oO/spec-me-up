import { v4 } from 'uuid';

export default (state = {}, action) => {
  switch (action.type) {
    case 'ADD_SPEC_PROJECT':
      const id = v4();
      return {
        ...state,
        [id]: { name: `Test ${id}` }
      };
    default:
      return state;
  }
};

export default (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_FIXME':
      return {
        ...state,
        [action.id]: { title: action.title, label: null }
      };
    default:
      return state;
  }
};

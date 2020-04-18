import { v4 } from 'uuid';

import { SpecActions } from '../types/actions/spec';

export const createSpecProject = (name: string) => {
  const specId = v4();

  return {
    type: SpecActions.CREATE_PROJECT,
    specId,
    name
  };
};

export const removeSpecProject = (specId: string) => {
  return {
    type: SpecActions.REMOVE_PROJECT,
    specId
  };
};

export const renameSpecProject = (specId: string, name: string) => {
  return {
    type: SpecActions.RENAME_PROJECT,
    specId,
    name
  };
};
export const setSpecContent = (specId: string, content: string) => {
  return {
    type: SpecActions.SET_CONTENT,
    specId,
    content
  };
};

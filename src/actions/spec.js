import { v4 } from 'uuid';

import { SpecActions } from '../types/actions/spec';

export const createSpecProject = (name: string) => {
  const id = v4();

  return {
    type: SpecActions.CREATE_SPEC_PROJECT,
    id,
    name
  };
};

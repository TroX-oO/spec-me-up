import { v4 } from 'uuid';

import { FixMeActions } from '../types/actions/fixme';

export const createFixMe = (title: string, specId: string) => {
  const fixMeId = v4();

  return {
    type: FixMeActions.CREATE,
    fixMeId,
    specId,
    title: title + ' ' + fixMeId
  };
};

export const removeFixMe = (fixMeId: string) => {
  return {
    type: FixMeActions.REMOVE,
    fixMeId
  };
};

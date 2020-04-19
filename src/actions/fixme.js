import { v4 } from 'uuid';

import { FixMeActions } from '../types/actions/fixme';

export const createFixMe = (specId: string, title: string) => {
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

export const addComment = (fixMeId: string, comment: string) => {
  const commentId = v4();

  return {
    type: FixMeActions.ADD_COMMENT,
    commentId,
    fixMeId,
    message: comment
  };
};

export const removeComment = (fixMeId: string, commentId: string) => {
  return {
    type: FixMeActions.REMOVE_COMMENT,
    fixMeId,
    commentId
  };
};

export const validateComment = (fixMeId: string, commentId: string) => {
  return {
    type: FixMeActions.VALIDATE_COMMENT,
    fixMeId,
    commentId
  };
};

export const invalidateComment = (fixMeId: string, commentId: string) => {
  return {
    type: FixMeActions.INVALIDATE_COMMENT,
    fixMeId,
    commentId
  };
};

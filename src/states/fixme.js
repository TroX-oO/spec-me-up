// @flow
export type CommentId = string;

export type CommentState = {
  id: string,
  createAt: number,
  message: string,
  validated: boolean
};

export type FixMeId = string;

export type FixMeState = {
  id: string,
  title: string,
  createAt: number,
  comments: Array<CommentId>
};

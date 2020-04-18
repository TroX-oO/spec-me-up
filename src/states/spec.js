// @flow
import type { FixMeState, FixMeId } from './fixme';

type SpecId = string;

export type SpecState = {
  id: SpecId,
  name: string,
  createAt: number,
  fixmes: Array<FixMeId>,
  content: ?Array<Object>
};

import { Action } from '../domain/Action';

export type ActionState = {
  actions: Action[]
};

export const actionInitialState: ActionState = {
  actions: []
};

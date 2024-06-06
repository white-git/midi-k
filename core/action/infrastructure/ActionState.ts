import { Action } from '../domain/Action';

type CommonActionState = {
  actions: Action[];
};

export type ActionState = CommonActionState;

export const actionInitialState = (): ActionState => ({
  actions: [],
});

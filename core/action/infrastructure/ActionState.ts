import { Action } from '../domain/Action';

type CommonActionState = {
  actions: Action[];
  delay: number;
};

export type ActionState = CommonActionState;

export const actionInitialState = (): ActionState => ({
  actions: [],
  delay: 100,
});

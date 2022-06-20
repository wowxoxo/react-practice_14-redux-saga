import {  CounterActionType } from "./action-types";

export interface IncrementCounterAction {
  type: CounterActionType.INCREMENT
}

export interface DecrementCounterAction {
  type: CounterActionType.DECREMENT
}

export type CounterAction =  IncrementCounterAction | DecrementCounterAction
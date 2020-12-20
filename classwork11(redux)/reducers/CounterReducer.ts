import { ReduxActions } from "../enums/Actions.enum";

const counterReducer = (
  state: number = 0,
  action: { type: ReduxActions; payload: number }
) => {
  switch (action.type) {
    case ReduxActions.INCREMENT:
      return state + action.payload;

    case ReduxActions.DECREMENT:
      return state - action.payload;

    default:
      return state;
  }
};

export default counterReducer;

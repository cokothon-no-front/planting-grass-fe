interface BoardInterface {
  [key: string]: any
}

export enum ActionState {
  SET,
  SET_DATA,
  SET_LIST,
  DEL
}

interface ActionInterface {
  type: ActionState,
  value: any
}

export const initialState: BoardInterface = {
  
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const reducer = (state: BoardInterface, action: ActionInterface) => {
  const { type, value } = action
  const { key, data } = value;
  switch (type) {
    case ActionState.SET_DATA:
      const assignValue = { ...state, ...value };
      console.log("assignValue", assignValue)
      return assignValue
    case ActionState.SET:
      return { ...state, [key]: data };
    case ActionState.DEL:
      return { ...state, [key]: undefined }
    default:
      return state;
  }
};

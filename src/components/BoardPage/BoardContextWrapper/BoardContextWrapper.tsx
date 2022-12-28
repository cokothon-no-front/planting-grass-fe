import React, { FunctionComponent, useEffect, useReducer } from 'react';
import BoardContext from '@/contexts/BoardContext';

import { initialState, reducer, ActionState } from '../reducer';

interface IBoardContextWrapperProps {
  prefix?: string,
  children?: any
}

const BoardContextWrapper: FunctionComponent<IBoardContextWrapperProps> = (props) => {
  const { prefix, children } = props;

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let assignPrefix = "";
    if (prefix !== undefined) {
      assignPrefix = `${prefix}_`;
    }
    dispatch({ type: ActionState.SET_DATA, value: { prefix: assignPrefix } })
  }, [dispatch, prefix]);

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardContextWrapper;

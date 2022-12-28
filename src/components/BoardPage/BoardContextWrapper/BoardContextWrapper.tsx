import React, { FunctionComponent, useEffect, useReducer } from 'react';
import BoardContext from '@/contexts/BoardContext';

import { initialState, reducer, ActionState } from '../reducer';

interface IBoardContextWrapperProps {
  children?: any
}

const BoardContextWrapper: FunctionComponent<IBoardContextWrapperProps> = (props) => {
  const { children } = props;

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardContextWrapper;

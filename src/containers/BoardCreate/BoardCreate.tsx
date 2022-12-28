import CreateBoard from '@/components/BoardPage/CreateBoard';
import DefaultLayout from '@/components/DefaultLayout';
import React, { FunctionComponent } from 'react';

interface IBoardCreateProps {
}

const BoardCreate: FunctionComponent<IBoardCreateProps> = (props) => {
  return <div>
    <DefaultLayout>
      Board
      <div>
        <CreateBoard />
      </div>
    </DefaultLayout>
  </div>;
};

export default BoardCreate;

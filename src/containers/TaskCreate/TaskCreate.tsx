import CreateBoard from '@/components/BoardPage/CreateBoard';
import DefaultLayout from '@/components/DefaultLayout';
import React, { FunctionComponent } from 'react';

interface ITaskCreateProps {
}

const TaskCreate: FunctionComponent<ITaskCreateProps> = (props) => {
  return <div>
    <DefaultLayout>
      태스크 생성
      <div>
        <CreateBoard prefix={'task'} />
      </div>
    </DefaultLayout>
  </div>;
};

export default TaskCreate;

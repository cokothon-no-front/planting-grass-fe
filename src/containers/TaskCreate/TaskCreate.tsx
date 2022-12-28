import React, { FunctionComponent } from "react";
import CreateBoard from "@/components/BoardPage/CreateBoard";
import DefaultLayout from "@/components/DefaultLayout";
import FlexCenter from '@/components/FlexCenter';

interface ITaskCreateProps {}

const TaskCreate: FunctionComponent<ITaskCreateProps> = (props) => {
  return (
    <DefaultLayout>
      <FlexCenter>
        <FlexCenter style={{ borderRadius: 30, backgroundColor: '#53a151', flexDirection: 'column', padding: 30 }}>
          <div style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>
            태스크 추가
          </div>
          <div style={{ width: 400, marginTop: 20 }}>
            <CreateBoard prefix={"task"} title={"태스크명"} contentsText={'상세정보'} alwaysPrivate={true} assignTitle={(title: string) => JSON.stringify({ title, check: false })} />
          </div>
        </FlexCenter>
      </FlexCenter>
    </DefaultLayout>
  );
};

export default TaskCreate;

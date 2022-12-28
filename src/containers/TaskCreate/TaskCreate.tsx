import React, { FunctionComponent } from "react";
import CreateBoard from "@/components/BoardPage/CreateBoard";
import DefaultLayout from "@/components/DefaultLayout";

interface ITaskCreateProps {}

const TaskCreate: FunctionComponent<ITaskCreateProps> = (props) => {
  return (
    <DefaultLayout>
      <div>
        <CreateBoard prefix={"task"} title={"태스크명"} contentsText={'상세정보'} alwaysPrivate={true} assignTitle={(title: string) => JSON.stringify({ title, check: false })} />
      </div>
    </DefaultLayout>
  );
};

export default TaskCreate;

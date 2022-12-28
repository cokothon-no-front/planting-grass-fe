import React, { FunctionComponent } from "react";
import DefaultLayout from "@/components/DefaultLayout";
import BoardPage from "@/components/BoardPage";
import TodoCheck from "./TodoCheck";

interface IBoardPageProps {
}

const TodoList: FunctionComponent<IBoardPageProps> = (props) => {  

  return (
    <DefaultLayout>
      <BoardPage prefix={"task"} title="태스크 목록" createText="태스크 추가" assignTitle={({ id, dataKey, data, userId, ...rest }: any) => {
        return <TodoCheck
          id={id}
          dataKey={dataKey}
          data={data}
          userId={userId}
          {...rest}
        />
      }} />
    </DefaultLayout>
  );
};

export default TodoList;

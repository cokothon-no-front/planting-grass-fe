import React, { FunctionComponent } from "react";
import DefaultLayout from "@/components/DefaultLayout";
import BoardPage from "@/components/BoardPage";

interface IBoardPageProps {
}

const Todolist: FunctionComponent<IBoardPageProps> = (props) => {  
  return (
    <DefaultLayout>
      <BoardPage prefix={"task"} />
    </DefaultLayout>
  );
};

export default Todolist;

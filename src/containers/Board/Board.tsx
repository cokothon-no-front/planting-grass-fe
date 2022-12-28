import React, { FunctionComponent } from "react";
import DefaultLayout from "@/components/DefaultLayout";
import BoardPage from "@/components/BoardPage";

interface IBoardPageProps {
}

const Board: FunctionComponent<IBoardPageProps> = (props) => {  
  return (
    <DefaultLayout>
      <BoardPage />
    </DefaultLayout>
  );
};

export default Board;

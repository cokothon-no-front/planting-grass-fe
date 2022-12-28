import React, { FunctionComponent } from "react";
import DetailBoard from "@/components/BoardPage/DetailBoard";
import DefaultLayout from "@/components/DefaultLayout";

interface IBoardDetailPageProps {
}

const BoardDetail: FunctionComponent<IBoardDetailPageProps> = (props) => {  
  return (
    <DefaultLayout>
      <DetailBoard />
    </DefaultLayout>
  );
};

export default BoardDetail;

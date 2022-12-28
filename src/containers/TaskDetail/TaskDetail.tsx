import React, { FunctionComponent } from "react";
import DetailBoard from "@/components/BoardPage/DetailBoard";
import DefaultLayout from "@/components/DefaultLayout";

interface IBoardDetailPageProps {
}

const TaskDetail: FunctionComponent<IBoardDetailPageProps> = (props) => {  
  return (
    <DefaultLayout>
      <DetailBoard
        prefix={"task"}
        assignTitle={(title?: string) => ((title && JSON.parse(title))?.title || "") as any}
        hideComment={true}
      />
    </DefaultLayout>
  );
};

export default TaskDetail;

import React, { FunctionComponent } from "react";
import DefaultLayout from "@/components/DefaultLayout";
import BoardPage from "@/components/BoardPage";

interface ILogListPageProps {
}

const LogList: FunctionComponent<ILogListPageProps> = (props) => {  
  return (
    <DefaultLayout>
      <BoardPage prefix={'log'} title={'히스토리'} />
    </DefaultLayout>
  );
};

export default LogList;

import React, { FunctionComponent, useContext, useEffect, useMemo } from "react";
import DefaultLayout from "@/components/DefaultLayout";
import BoardPage from "@/components/BoardPage";
import TodoCheck from "./TodoCheck";
import FlexCenter from '@/components/FlexCenter';
import Friends from "@/components/Friends";
import { useRecoilValue } from "recoil";
import accountState from "@/state/account";
import { isEmpty } from "@/utils";
import BoardContext from "@/contexts/BoardContext";

interface IBoardPageProps {
}

const TodoList: FunctionComponent<IBoardPageProps> = (props) => {  
  const account = useRecoilValue(accountState)
  const { state } = useContext(BoardContext);
  const { friends = [] }: { friends: any[] } = state

  const savedAccount: any = useMemo(() => {
    if (isEmpty(account)) {
      return undefined
    }
    return account
  }, [account])

  // useEffect(() => {
  //   console.log('state', state)
  // }, [state])
  

  return (
    <DefaultLayout>
      <FlexCenter>
        <Friends
          style={{ marginRight: 10, height: 415 }}
        />
        <BoardPage
          prefix={"task"}
          title="태스크 목록"
          createText="태스크 추가"
          style={{ width: 300 }}
          listHeight={300}
          assignTitle={({ id, dataKey, data, userId, ...rest }: any) => {
            return <TodoCheck
              id={id}
              dataKey={dataKey}
              data={data}
              userId={userId}
              {...rest}
            />
          }} />
        <BoardPage
          prefix={'log'}
          title={'히스토리'}
          defaultSize={100}
          listHeight={366}
          hideCreate={true}
          hideFooter={true}
          clickable={false}
          repeat={!isEmpty(friends)}
          style={{ marginLeft: '10px', width: 550 }}
          assignTitle={({ id, dataKey, data, userId, ...rest }: any) => {
            return <div>
              {data}
            </div>
          }}
          filter={(v: any) => {
            const isNptMyEmail = v.userId !== savedAccount.email
            const isFriendsEmail = friends.find(f => f.email === v.userId)
            return isNptMyEmail && isFriendsEmail !== undefined
          }}
        />
      </FlexCenter>
    </DefaultLayout>
  );
};

export default TodoList;

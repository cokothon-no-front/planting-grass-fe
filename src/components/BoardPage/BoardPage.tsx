import React, { FunctionComponent, useContext, useEffect } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { PageableData, UserSave } from '@gongdongho12/npm-usersave-api/dist/meta';
import { Button, List, Pagination } from 'antd';
import { userSave } from '@/api';
import FlexCenter from '@/components/FlexCenter';
import BoardContext from '@/contexts/BoardContext';
import { useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import accountState from '@/state/account';
import isEmpty from '@/utils/isEmpty';

import { BoardPageWrapper } from './BoardPageStyles';
import { ActionState } from './reducer/BoardReducer';

interface IBoardPageProps {
}

const BoardPage: FunctionComponent<IBoardPageProps> = (props) => {
  const { state, dispatch } = useContext(BoardContext);

  const { prefix = "", page = 1, boardList = [], total = 10 } = state;

  const account = useRecoilValue(accountState);

  const navigate = useNavigate();

  useEffect(() => {
    userSave
      .getSavePageableQuery(`${prefix}title`, {
        size: 10,
        page: 0,
        sort: "createdDate,desc",
      })
      .then(({ total, data }: PageableData<UserSave>) => {
        console.log("total", total);
        console.log("data", data);
        dispatch({
          type: ActionState.SET,
          value: {
            key: "boardList",
            data,
          }
        });
        dispatch({
          type: ActionState.SET,
          value: {
            key: "total",
            data: total,
          }
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefix]);

  const updatePage = (page: number) => {
    dispatch({
      type: ActionState.SET,
      value: {
        key: "page",
        data: page,
      }
    });
  };

  return (
    <BoardPageWrapper>
      <List
        header={
          <FlexCenter>
            <b>게시판</b>
            <div style={{ marginLeft: "auto" }}>
              {!isEmpty(account) && (
                <Button
                  type="primary"
                  onClick={() => navigate("/board/create")}
                  icon={<EditOutlined />}
                >
                  글쓰기
                </Button>
              )}
            </div>
          </FlexCenter>
        }
        footer={<Pagination defaultCurrent={page} onChange={updatePage} total={total} />}
        bordered
        dataSource={boardList}
        renderItem={(item: any) => {
          const { id, dataKey, data, userId } = item;
          return (
            <List.Item key={id} onClick={() => navigate(`/board/${id}`)}>
              [{dataKey}] {data} [작성자: {userId}]
            </List.Item>
          );
        }}
      />
    </BoardPageWrapper>
  );
};

export default BoardPage;

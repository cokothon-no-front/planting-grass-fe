import React, { FunctionComponent, useContext, useEffect, useMemo } from 'react';
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
  title?: string,
  prefix?: string,
  createText?: string,
  assignTitle?: (item: any) => any
}

const BoardPage: FunctionComponent<IBoardPageProps> = (props) => {
  const { title = "게시판", prefix, createText = "글쓰기", assignTitle } = props

  const assignPrefix = useMemo<string>(() => {
    if (prefix !== undefined) {
      return `${prefix}_`;
    } else {
      return "";
    }
  }, [prefix]);

  const pathPrefix = prefix || 'board'

  const { state, dispatch } = useContext(BoardContext);

  const { page = 1, boardList = [], total = 10 } = state;
  useEffect(() => {
    console.log('boardList', boardList)
  }, [boardList])
  

  const account = useRecoilValue(accountState);

  const navigate = useNavigate();

  useEffect(() => {
    userSave
      .getSavePageableQuery(`${assignPrefix}title`, {
        size: 10,
        page: 0,
        sort: "createdDate,desc",
      })
      .then(({ total, data }: PageableData<UserSave>) => {
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
  }, [assignPrefix]);

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
            <b>{title}</b>
            <div style={{ marginLeft: "auto" }}>
              {!isEmpty(account) && (
                <Button
                  type="primary"
                  onClick={() => navigate(`/${pathPrefix}/create`)}
                  icon={<EditOutlined />}
                >
                  {createText}
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
            <List.Item key={id} onClick={() => navigate(`/${pathPrefix}/${id}`)}>
              <FlexCenter>
                {assignTitle !== undefined ? assignTitle(item) : `[${dataKey}] ${data} [작성자: ${userId}]`}
              </FlexCenter>
            </List.Item>
          );
        }}
      />
    </BoardPageWrapper>
  );
};

export default BoardPage;

import React, { FunctionComponent, useCallback, useContext, useEffect, useMemo } from 'react';
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
  assignTitle?: (item: any) => any,
  style?: any;
  listHeight?: number;
  defaultSize?: number;
  hideCreate?: boolean;
  hideFooter?: boolean;
  clickable?: boolean;
  repeat?: boolean;
}

const BoardPage: FunctionComponent<IBoardPageProps> = (props) => {
  const { title = "게시판", prefix, createText = "글쓰기", assignTitle, defaultSize = 10, hideCreate = false, hideFooter = false, clickable = true, listHeight, style = {}, repeat = false } = props

  const assignPrefix = useMemo<string>(() => {
    if (prefix !== undefined) {
      return `${prefix}_`;
    } else {
      return "";
    }
  }, [prefix]);

  const pathPrefix = prefix || 'board'

  const { state, dispatch } = useContext(BoardContext);

  const { [`${assignPrefix}page`]: page = 1, [`${assignPrefix}boardList`]: boardList = [], [`${assignPrefix}total`]: total = defaultSize } = state;
  useEffect(() => {
    console.log('boardList', boardList)
  }, [boardList])
  

  const account = useRecoilValue(accountState);

  const navigate = useNavigate();

  const refreshList = useCallback((page: number) => {
    userSave
      .getSavePageableQuery(`${assignPrefix}title`, {
        size: defaultSize,
        page: page - 1,
        sort: "createdDate,desc",
      })
      .then(({ total, data }: PageableData<UserSave>) => {
        dispatch({
          type: ActionState.SET,
          value: {
            key: `${assignPrefix}boardList`,
            data,
          }
        });
        dispatch({
          type: ActionState.SET,
          value: {
            key: `${assignPrefix}total`,
            data: total,
          }
        });
      });
  }, [assignPrefix, defaultSize, dispatch])
  

  // useEffect(() => {
  //   refreshList(page)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [page, refreshList, assignPrefix]);

  
  useEffect(() => {
    refreshList(page)
    if (repeat) {
      const interval = setInterval(() => {
        refreshList(page)
      }, 5000);
      return () => clearInterval(interval);
    }
    return undefined
  }, [page, refreshList, repeat]);

  const updatePage = (page: number) => {
    dispatch({
      type: ActionState.SET,
      value: {
        key: `${assignPrefix}page`,
        data: page,
      }
    });
  };

  return (
    <BoardPageWrapper style={style} listHeight={listHeight} clickable={clickable}>
      <List
        header={
          <FlexCenter>
            <b>{title}</b>
            <div style={{ marginLeft: "auto" }}>
              {hideCreate === false && !isEmpty(account) && (
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
        footer={hideFooter === false && <Pagination defaultCurrent={page} onChange={updatePage} total={total} />}
        bordered
        dataSource={boardList}
        renderItem={(item: any) => {
          const { id, dataKey, data, userId } = item;
          return (
            <List.Item
              key={id}
              onClick={clickable ? (() => navigate(`/${pathPrefix}/${id}`)) : undefined}
            >
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

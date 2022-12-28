import React, { FunctionComponent, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Card, Modal, Button } from "antd";
import { userSave } from "@/api";
import { useNavigate, useParams } from "react-router";
import { UserSave } from '@gongdongho12/npm-usersave-api/dist/meta';
import BoardComment from '../BoardComment';
import BoardContext from "@/contexts/BoardContext";
import { useRecoilValue } from "recoil";
import accountState from "@/state/account";
import { isEmpty } from "@/utils";
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

interface IDetailBoardProps {
  prefix?: string
}

const { confirm } = Modal;

const DetailBoard: FunctionComponent<IDetailBoardProps> = (props) => {
  const { prefix } = props
  const { state  } = useContext(BoardContext)

  const navigate = useNavigate();
  const account = useRecoilValue(accountState)

  const assignPrefix = useMemo<string>(() => {
    if (prefix !== undefined) {
      return `${prefix}_`;
    } else {
      return "";
    }
  }, [prefix]);

  const savedAccount: any = useMemo(() => {
    if (isEmpty(account)) {
      return undefined
    }
    return account
  }, [account])

  const { id }: { id?: string } = useParams()
  const [titleData, setTitleData] = useState<Partial<UserSave>>({});
  const [contentsData, setContentsData] = useState<Partial<UserSave>>({});
  const [commentList, setCommentList] = useState<UserSave[]>([]);

  const query = useMemo(() => {
    const query = `${assignPrefix}board:${id}:`
    return query
  }, [assignPrefix, id])

  useEffect(() => {
    refreshAll()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignPrefix, id]);

  const refreshComments = useCallback(
    () => {
      userSave.getSaveListQuery(`${query}%`)
        .then((data: UserSave[]) => {
          const commentList: UserSave[] = []
          data.forEach((userSaveData: UserSave) => {
            const { dataKey } = userSaveData
            if (dataKey === `${query}contents`) {
              setContentsData(userSaveData)
            } else {
              commentList.push(userSaveData)
            }
          });
          setCommentList(commentList)
        })
    },
    [query],
  )

  const deleteBoard = useCallback(
    () => {
      const promiseArr: Promise<any>[] = []
      const titleId = titleData?.id
      const contentsId = contentsData?.id
      const comentIdList: Array<number> = commentList?.reduce((prev, comment: UserSave) => {
        const commentId: number | undefined = comment.id
        if (commentId !== undefined) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          prev.push(commentId)
        }
        return prev
      }, [])
      if (titleId) {
        promiseArr.push(userSave.deleteUserSave(titleId))
      }
      if (contentsId) {
        promiseArr.push(userSave.deleteUserSave(contentsId))
      }
      if (comentIdList.length > 0) {
        const commentPromiseArr = comentIdList.map((commentId: number) => userSave.deleteUserSave(commentId))
        Array.prototype.push.apply(promiseArr, commentPromiseArr)
      }
      Promise.all(promiseArr).then(() => {
        navigate('/board')
      })
    },
    [commentList, contentsData?.id, navigate, titleData?.id]
  )
  
  const refreshAll = useCallback(() => {
    const numberId: number = id ? parseInt(id, 10) : 0
    userSave.getUserSaveById(numberId)
      .then((titleData: UserSave) => {
        setTitleData(titleData)
      })
              
    refreshComments()
  }, [id, refreshComments])

  const showConfirm = useCallback(
    () => {
      confirm({
        title: '현재 글을 삭제하시겠습니까??',
        icon: <ExclamationCircleOutlined />,
        content: '삭제시 다시 복구할 수 없습니다.',
        onOk() {
          deleteBoard()
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    },
    [deleteBoard],
  )

  const isWriter = useMemo(() => titleData.userId === savedAccount?.email, [savedAccount?.email, titleData.userId])

  return (
    <div>
      <Card
        title={titleData?.data}
        style={{ width: "100%" }}
        extra={isWriter && <Button type="primary" icon={<DeleteOutlined />} danger onClick={showConfirm}>삭제</Button>}>
        {contentsData?.data}
      </Card>
      <BoardComment query={query} commentList={commentList} refresh={refreshComments} />
    </div>
  );
};

export default DetailBoard;

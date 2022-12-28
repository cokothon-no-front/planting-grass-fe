import React, { FunctionComponent, useCallback, useMemo } from "react";
import { UserSave } from "@gongdongho12/npm-usersave-api/dist/meta";
import { Button, Checkbox, Form, Input, message } from "antd";
import { userSave } from "@/api";
import { useNavigate } from "react-router";

interface ICreateBoardProps {
  prefix?: string;
  title?: string;
  contentsText?: string;
  alwaysPrivate?: boolean;
  assignTitle?: (data: string) => any
}

const offset: any = 4
const layout = {
  labelCol: { span: offset },
  wrapperCol: { span: 20 },
};

const CreateBoard: FunctionComponent<ICreateBoardProps> = (props) => {
  const { prefix, title = "제목", contentsText = "컨텐츠", alwaysPrivate = false, assignTitle } = props;
  const navigate = useNavigate()
  const assignPrefix = useMemo<string>(() => {
    if (prefix !== undefined) {
      return `${prefix}_`;
    } else {
      return "";
    }
  }, [prefix]);

  const onFinish = (values: any) => {
    console.log(values);
    addSaveUser(values)
  };

  const addSaveUser = useCallback((values: any) => {
    const { title, contents, private: isPrivate } = values
    userSave.addUserSave({
      dataKey: `${assignPrefix}title`,
      data: assignTitle !== undefined ? assignTitle(title) : title,
      private: alwaysPrivate || isPrivate
    }).then((data: UserSave) => {
      console.log('title data', data)
      const { id } = data
      return userSave.addUserSave({
        dataKey: `${assignPrefix}board:${id}:contents`,
        data: contents,
        private: alwaysPrivate || isPrivate
      })
    }).then((data: UserSave) => {
      console.log('contents data', data)
      const { id } = data
      message.success("성공적으로 추가되었습니다.")
      navigate(-1)
    })
  }, [alwaysPrivate, assignPrefix, assignTitle, navigate])

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
    >
      <Form.Item name={"title"} label={title} rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      {alwaysPrivate !== true && <Form.Item wrapperCol={{ ...layout.wrapperCol, offset }}>
        <Form.Item name="private" noStyle valuePropName="checked">
          <Checkbox>비밀글</Checkbox>
        </Form.Item>
      </Form.Item>}
      <Form.Item name={'contents'} label={contentsText}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset }}>
        <Button type="primary" htmlType="submit">
          저장
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateBoard;

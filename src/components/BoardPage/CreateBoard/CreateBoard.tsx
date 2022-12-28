import React, { FunctionComponent, useCallback, useMemo } from "react";
import { UserSave } from "@gongdongho12/npm-usersave-api/dist/meta";
import { Button, Checkbox, Form, Input, message } from "antd";
import { userSave } from "@/api";
import { useNavigate } from "react-router";

interface ICreateBoardProps {
	prefix?: string;
}

const offset: any = 4
const layout = {
  labelCol: { span: offset },
  wrapperCol: { span: 20 },
};

const CreateBoard: FunctionComponent<ICreateBoardProps> = (props) => {
  const { prefix } = props;
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
      data: title,
      private: isPrivate
    }).then((data: UserSave) => {
      console.log('title data', data)
      const { id } = data
      return userSave.addUserSave({
        dataKey: `${assignPrefix}board:${id}:contents`,
        data: contents,
        private: isPrivate
      })
    }).then((data: UserSave) => {
      console.log('contents data', data)
      const { id } = data
      message.success("게시글이 성공적으로 작성되었습니다.")
      navigate(-1)
    })
  }, [assignPrefix, navigate])

  return (
		<Form
			{...layout}
			name="nest-messages"
			onFinish={onFinish}
		>
			<Form.Item name={"title"} label="제목" rules={[{ required: true }]}>
				<Input />
			</Form.Item>
			<Form.Item wrapperCol={{ ...layout.wrapperCol, offset }}>
				<Form.Item name="private" noStyle valuePropName="checked">
					<Checkbox>비밀글</Checkbox>
				</Form.Item>
			</Form.Item>
			<Form.Item name={'contents'} label="컨텐츠">
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

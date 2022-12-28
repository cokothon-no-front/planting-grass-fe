import React, { FunctionComponent, useCallback } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { useSetRecoilState } from 'recoil';
import { token as tokenState } from '@/state';
import FlexCenter from '@/components/FlexCenter';
import { account } from '@/api'
import { useNavigate } from 'react-router-dom';


interface ISignInProps {}

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const { login } = account

const SignIn: FunctionComponent<ISignInProps> = (props) => {
  const navigate = useNavigate();


  const setToken = useSetRecoilState(tokenState)

  const onFinish = useCallback(
    (values: any) => {
      console.log("Success:", values);
      const { email, password, remember } = values;
      login(email, password).then((data: any) => {
        const { token } = data;
        console.log("");
        setToken(token);
        localStorage.setItem("jwt", token);
        navigate("/");
      });
    },
    [navigate, setToken]
  );

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="E-mail"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ span: 24 }}>
        <FlexCenter>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
          <Button
            type="default"
            style={{ marginLeft: "5px" }}
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </Button>
        </FlexCenter>
      </Form.Item>
    </Form>
  );
};

export default SignIn;

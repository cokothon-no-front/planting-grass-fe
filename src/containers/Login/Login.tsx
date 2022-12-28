import React, { FunctionComponent } from "react";
import DefaultLayout from "@/components/DefaultLayout";
import SignIn from '@/components/SignIn';
interface ILoginProps {
}

const Login: FunctionComponent<ILoginProps> = (props) => {
  return (
    <DefaultLayout>
      <SignIn />
    </DefaultLayout>
  );
};

export default Login;

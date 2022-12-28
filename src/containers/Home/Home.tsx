import React, { FunctionComponent, useMemo, useEffect } from "react";
import DefaultLayout from "@/components/DefaultLayout";
import FlexCenter from "@/components/FlexCenter";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import accountState from "@/state/account";
import { isEmpty } from "@/utils";
import SignIn from "@/components/SignIn";
import Title from "@/components/Title";

interface IHomeProps {}

const Home: FunctionComponent<IHomeProps> = (props) => {
  const navigate = useNavigate();
  const account = useRecoilValue(accountState)

  const savedAccount: any = useMemo(() => {
    if (isEmpty(account)) {
      return undefined
    }
    return account
  }, [account])

  useEffect(() => {
    if (savedAccount !== undefined) {
      navigate('/task')
    }
  }, [navigate, savedAccount])
  

  return (
    <DefaultLayout style={{ padding: "0px !important" }} hideTitle={true}>
      <FlexCenter style={{ height: '100%', width: '100%' }}>
        <FlexCenter style={{ borderRadius: 30, backgroundColor: 'white', position: 'relative', height: '300px', width: '800px' }}>
          <Title style={{ position: 'absolute', left: '70px' }} />
          <FlexCenter style={{ borderRadius: 30, backgroundColor: '#53a151', position: 'absolute', padding: '100px 30px', right: '70px' }}>
            <FlexCenter style={{ height: '100%', flexDirection: 'column' }}>
              <div style={{ color: 'white', fontSize: 30, fontWeight: 'bold', paddingBottom: 20 }}>
                잔디 심으러 가기
              </div>
              <SignIn />
            </FlexCenter>
          </FlexCenter>
        </FlexCenter>
      </FlexCenter>
    </DefaultLayout>
  );
};


export default Home;

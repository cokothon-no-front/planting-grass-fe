import React, { FunctionComponent } from 'react';
import logo from './imgs/logo.png'
import FlexCenter from '@/components/FlexCenter';

interface ITitleProps {
  style?: any
}

const Title: FunctionComponent<ITitleProps> = ({ style = {} }) => {
  return <div style={style}>
    <div style={{ backgroundImage: `url(${logo})`, width: 'auto', height: 120, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'contain' }} />
    <FlexCenter style={{ color: '#653232', fontSize: 35, fontWeight: 'bold' }}>
      내 · 청춘에 · 잔디 · 심기
    </FlexCenter>
  </div>;
};

export default Title;

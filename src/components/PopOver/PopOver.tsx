import React, { FunctionComponent } from 'react';
import {
  Button, ButtonProps, Popover, PopoverProps
} from 'antd';

interface IPopOverProps {
  buttonProps?: ButtonProps
  children?: any
  
}

const PopOver: FunctionComponent<IPopOverProps & PopoverProps> = ({ buttonProps, children }) => {
  return <div>
    <Popover placement="bottomRight" trigger="click" {...buttonProps}>
        <Button style={{ border: 'none' }} ghost>{children}</Button>
    </Popover>
  </div>;
};

export default PopOver;

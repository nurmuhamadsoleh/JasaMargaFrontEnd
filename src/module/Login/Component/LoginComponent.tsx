import { Button, Form as FormANTD } from "antd";
import { Field, Form } from "react-final-form";
import { LockFilled, MailOutlined } from '@ant-design/icons';

import Input from "component/Input";
import LoginValidation from "../Validation/LoginValidation";
import React from 'react'

interface IProps {
  googlebuttonref: React.RefObject<HTMLDivElement> | undefined;
  handleSubmit: (_vals:any) => void
  isLoadingSubmit:boolean
}
export default function LoginComponent(props: IProps) {
  const {googlebuttonref,handleSubmit,isLoadingSubmit} = props;

    return (
        <Form onSubmit={handleSubmit} validate={LoginValidation}>
          {(formProps) =>{
            const {handleSubmit, invalid, dirty, form} = formProps
            return (
              <FormANTD layout="vertical" onFinish={handleSubmit} className="pl-4">
                <h1 className="font-bold text-2xl text-center">Aplikasi JobsPortal</h1>
                <div className=''>
                  <Field name='username'
                  component={Input} 
                  isFormItem  
                  prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}  
                  placeholder="Email Address"
                  className="w-full"
                  showError={dirty}
                  />
                </div>
                <div>
                  <Field
                    name="password"
                    component={Input}
                    type="password"
                    isFormItem
                    prefix={<LockFilled style={{ color: 'rgba(0,0,0,.25)' }} />}
                    className="w-full"
                    placeholder="Password"
                    showError={dirty}
                    isPassword
                  />
                </div>
                <div className="mx-auto w-full">
                  <Button
                    className="btn w-full h-10 hover:!text-white"
                    size="middle"
                    htmlType="submit"
                    disabled={invalid}
                    loading={isLoadingSubmit}
                  >
                    Login
                  </Button>
                  <div className="mt-3 w-full">
                  <div className="w-full px-10" ref={googlebuttonref}></div>
                  </div>
                </div>
              </FormANTD>
            )
          }}
        </Form>
    );
}

import { Button, Form as FormANTD } from "antd";
import { Field, Form } from "react-final-form";
import { LockFilled, MailOutlined } from '@ant-design/icons';

import Image from "next/image";
import Input from "component/Input";
import JasaMarga from "../../../assets/images/jasaMarga.png"
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
        <div className="h-screen w-full flex flex-col lg:flex-row">
          {/* Bagian Form */}
          <div className="flex basis-1/2 flex-col justify-center items-center p-8">
            <Form onSubmit={handleSubmit} validate={LoginValidation}>
              {(formProps) => {
                const { handleSubmit, invalid, dirty } = formProps;
                return (
                  <FormANTD layout="vertical" onFinish={handleSubmit} className="w-full max-w-md">
                    <div className="flex justify-center">
                      <Image src={JasaMarga} alt="Jasa Marga" width={300} height={300} className="object-contain rounded-md bg-transparent" />
                    </div>
                    <div>
                      <Field
                        name="username"
                        component={Input}
                        isFormItem
                        label="Username"
                        prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Email Address"
                        className="w-full"
                        showError={dirty}
                      />
                    </div>
                    <div>
                      <Field
                        name="password"
                        label="Password"
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
                  <div className="w-full flex">
                    <Button
                      className="bg-blue-600 w-auto h-10 text-white hover:!text-black ml-auto px-5"
                      size="middle"
                      htmlType="submit"
                      disabled={invalid}
                      loading={isLoadingSubmit}
                    >
                      Login
                    </Button>
                  </div>
                  </FormANTD>
                );
              }}
            </Form>
          </div>
          {/* Bagian Gambar */}
          <div className="flex basis-1/2 bg-transparent justify-center items-center rounded-md">
            <Image src={JasaMarga} alt="Jasa Marga" width={300} height={300} className="object-contain" />
          </div>
        </div>
    );
}

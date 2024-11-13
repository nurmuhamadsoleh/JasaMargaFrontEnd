import { Button, Divider, Form as FormANTD, Space } from 'antd'
import { Field, Form } from 'react-final-form'

import Input from 'component/Input'
import Modal from 'component/Modal'
import React from 'react'

interface IProps {
    onClose: () => void
    isLoadingGerbang: boolean
    handleSubmit: (_vals:any) => void
    initialValues: any
    isLoadingSubmit: boolean
} 
export default function ModalMasterGerbangComponent(props: IProps) {
    const {handleSubmit, initialValues, isLoadingGerbang, isLoadingSubmit, onClose} = props
    console.log("initialValues", initialValues)
  return (
    <main>
        <Modal footer={null} open onCancel={onClose} title={null} width={900}>
            <Form onSubmit={handleSubmit} initialValues={initialValues}>
                {(formProps) => {
                    const {handleSubmit, dirty, invalid} = formProps
                    return (
                        <FormANTD layout='horizontal' onFinish={handleSubmit}>
                            <div className='basis-full bg-gray-50 rounded-lg px-3
                            '>
                                <Divider>{`${initialValues ? 'Edit' : 'Tambah'} Gerbang`}</Divider>
                                <div className='-mt-4'>
                                    <Field name='NamaGerbang' component={Input} label='Nama Gerbang*' placeholder='Masukan Nama Gerbang' isFormItem
                                    showError={dirty} allowClear/>
                                </div>
                                <div className='-mt-4'>
                                     <Field name='NamaCabang' component={Input} label='Nama Cabang*' placeholder='Masukan Nama Cabang' isFormItem
                                    showError={dirty} allowClear/>
                                </div>
                                <div className='flex justify-center gap-3'>
                                    <Space>
                                        <Button className='bg-red-700 text-white' onClick={onClose}>Batal</Button>
                                        <Button type='primary'  htmlType='submit' loading={isLoadingSubmit} disabled={isLoadingSubmit}>Simpan</Button>
                                    </Space>
                                </div>
                            </div>
                        </FormANTD>
                    )
                }}                
            </Form>
        </Modal>
    </main>
  )
}

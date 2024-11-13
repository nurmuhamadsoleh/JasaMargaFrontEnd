import { Button, Radio, Space } from 'antd'
import { PartitionOutlined, PlusCircleOutlined } from '@ant-design/icons'

import React from 'react'
import Table from 'component/Table'

interface IProps {
  columnGerbang: any[]
  dataGerbang?:any
  isLoadingDataGerbang?:boolean
  handleChangeGlobalFilterGerbang?: (_query: string) => void
  modalGerbangOpen: () => void
}

export default function MasterGerbangComponent(props: IProps) {
  const {columnGerbang, dataGerbang, isLoadingDataGerbang, handleChangeGlobalFilterGerbang, modalGerbangOpen} = props
  console.log("data Gerbang", dataGerbang )
  return (
    <main className='mt-24'>
      <div className='flex justify-end'>
        <Button size='middle' icon={<PlusCircleOutlined />} onClick={modalGerbangOpen} className='bg-blue-800 text-white hover:bg-transparent hover:text-black hover:border-2 hover:border-blue-800 hover:border-solid'>Tambah</Button>
      </div>
      <div className='mt-3'>
        <Table columns={columnGerbang} dataSource={ dataGerbang?.data?.rows?.rows ?? []} isLoading={isLoadingDataGerbang}  fixedHeader  useFilterGlobal globalFilterLabel="Pencarian" usePagination  totalData={
            dataGerbang?.data?.rows?.rows?.length > 0 ? parseInt(dataGerbang?.data?.rows?.count, 10) : 0
          } />
      </div>
    </main>

  )
}

import { Button, Space, Tooltip } from 'antd'
import {DeleteGerbangAPI, GetGerbangAPI} from "service/gerbang.api"
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import React, {useState} from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'

import Confirm from 'component/Confirm'
import MasterGerbangComponent from '../Component/MasterGerbangComponent'
import ModalMasterGerbangContainer from './ModalMasterGerbangContainer'
import { toast } from 'react-toastify'

export default function MasterGerbangContainer() {
  const [pageQueryMasterGerbang, setPageQueryMasterGerbang] = useState<string>("")
  const [editGerbang, setEditGerbang] = useState<any>({})
  const [modalIsShow, setModalIsShow] = useState<boolean>(false)
  const handleChangeGlobalFilterGerbang = (v:string) =>{
    setPageQueryMasterGerbang(v)
  }
  const {data: dataMasterGerbang, isFetching: isFetchingMasterGerbang, refetch: refetchMasterGerbang} = useQuery([
    'getMasterGerbangAPI',
    undefined,
    undefined,
    pageQueryMasterGerbang,
    pageQueryMasterGerbang,
  ], GetGerbangAPI, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    // refetchInterval: 1000,
    // onError: (error: any) => {
    //   toast.error(error.message)
    // },
  })
  const mutateDeleteGerbang = useMutation(DeleteGerbangAPI, {
    onSuccess: (data: any) => {
      if(data?.code === 200){
        console.log("response delete", data)
        toast.success(`${data?.message} Id Cabang ${data?.IdCabang} Id Gerbang ${data?.IdGerbang}`)
        refetchMasterGerbang()
        return
      }
      if(data?.code === 404){
        toast.warning(`${data?.message}`)
        return
      }
    },
    onError: (error: any) => {
      if (error.message === 'Network Error') {
        toast.warning(error.message)
        return
      } else {
        toast.error(error.message)
        return
      }
    },
  })
  const handleDelete = (vals:any) =>{
    console.log("delete", vals)
    mutateDeleteGerbang.mutate({
      id:parseInt(vals?.id),
      IdCabang:parseInt(vals?.IdCabang)
    })
  }
  let initialValue: any
  if(editGerbang){
    initialValue = {
      ...editGerbang
    }
  } 
  // initialValue = {
  //     id:"",
  //     IdCabang:"",
  //     NamaGerbang: "",
  //     NamaCabang:""
  // }
  const columnHeader = [
    {
      header: 'No',
      centerHeader: true,
      cell: (row: any) => (
        <div className="text-center">
          {parseInt(row.row.id, 10) + 1}
        </div>
      ),
    },
    {
      header: 'NAMA GERBANG',
      accessorKey: 'NamaGerbang',
      enableSorting: true,
      centerHeader: true,
      cell: (row: any) => {
        return <div className="text-left">{row.getValue()}</div>
      },
    },
    {
      header: 'NAMA CABANG',
      accessorKey: 'NamaCabang',
      enableSorting: true,
      centerHeader: true,
      cell: (row: any) => {
        return <div className="text-left">{row.getValue()}</div>
      },
    },
     {
      header: 'AKSI',
      centerHeader: true,
      enableSorting: false,
      cell: (row: any) => {
        return (
          <div className="text-center">
            <Space>
              <Tooltip title="Delete" color="#000000">
                <Confirm
                  icon={<DeleteOutlined />}
                  title={`Hapus Gerbang ${row.row.original.NamaGerbang}`}
                  onOk={() => handleDelete(row.row.original)}
                  size="small"
                />
              </Tooltip>
              <Tooltip title="Edit" color="#000000">
                <Button
                  size="small"
                  icon={<EditOutlined />}
                  onClick={() => {
                    setEditGerbang(row.row.original)
                    setModalIsShow(true)
                  }}
                />
              </Tooltip>
            </Space>
          </div>
        )
      },
    },
  ]
  return (
   <>
  <MasterGerbangComponent columnGerbang={columnHeader} modalGerbangOpen={() => {
    setModalIsShow(true)
    setEditGerbang(undefined)
  }} dataGerbang={dataMasterGerbang} isLoadingDataGerbang={isFetchingMasterGerbang} handleChangeGlobalFilterGerbang={handleChangeGlobalFilterGerbang}/>
    {modalIsShow && (
      <ModalMasterGerbangContainer initialValues={initialValue} onClose={() => {
        refetchMasterGerbang()
        setModalIsShow(false)
      }} isLoadingGerbang={isFetchingMasterGerbang}/>
    )}  
   </>
  )
}

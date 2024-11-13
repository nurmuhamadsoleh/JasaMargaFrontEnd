import {AddGerbangAPI, UpdateGerbangAPI} from "service/gerbang.api"
import React, {useEffect, useState} from 'react'

import ModalMasterGerbangComponent from '../Component/ModalMasterGerbangComponent'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'

interface IProps {
    onClose: () => void
    initialValues: any
    isLoadingGerbang: boolean
}
export default function ModalMasterGerbangContainer(props: IProps) {
    const {initialValues, isLoadingGerbang, onClose} = props
    const [idCabang, setIdCabang] = useState<number>(30)
    const [id, setId] = useState<number>(1)
       console.log("idCabang", idCabang)

    const mutateAddGerbang = useMutation(AddGerbangAPI,{
        onSuccess: (data: any) => {
            console.log("respose data", data)
            if(data?.code === 201){
                setId(prevId => prevId + 1)
                setIdCabang(prevIdCabang => prevIdCabang + 1)
                toast.success(`${data?.message}`)
                onClose()
                return
            }
            if(data?.code === 401){
                 toast.success(`${data?.message}`)
                  setId(prevId => prevId + 1)
                 setIdCabang(prevIdCabang => prevIdCabang + 1)
                 return 
            }
        },
        onError: (error: any) => {
            if (error.message === 'Network Error') {
                toast.warning(error.message)
                setId(prevId => prevId + 1)
                setIdCabang(prevIdCabang => prevIdCabang + 1)
                return
            } else {
                toast.error(error.message)
                setId(prevId => prevId + 1)
                setIdCabang(prevIdCabang => prevIdCabang + 1)
                return
            }
        },
    })
    const mutateUpdateGerbang = useMutation(UpdateGerbangAPI,{
        onSuccess: (data: any) => {
            if(data?.code == 200){
                toast.success(`${data?.message} Id ${data?.data[0]}`)
                onClose()
                return
            }
            if(data?.code == 404){
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
     const handleSubmit = (vals: any) => {
        if(initialValues){
            mutateUpdateGerbang.mutate({
            id: vals?.id,
            IdCabang:vals?.IdCabang,
            NamaGerbang: vals?.NamaGerbang,
            NamaCabang: vals?.NamaCabang
            })
        } else {
            mutateAddGerbang.mutate({
                id: id,
                IdCabang:idCabang,
                NamaGerbang: vals?.NamaGerbang,
                NamaCabang: vals?.NamaCabang
            })
        }
    }
  return (
    <ModalMasterGerbangComponent handleSubmit={handleSubmit} initialValues={initialValues} isLoadingGerbang={isLoadingGerbang} onClose={onClose} isLoadingSubmit={mutateUpdateGerbang.isLoading}/>
  )
}

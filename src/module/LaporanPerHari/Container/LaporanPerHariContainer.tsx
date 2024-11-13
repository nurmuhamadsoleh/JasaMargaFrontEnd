import React, {useState} from 'react'
import { Button, Space, Tooltip } from 'antd'
import { useMutation, useQuery } from '@tanstack/react-query'
import Confirm from 'component/Confirm'
import LaporanPerHariComponent from '../Component/LaporanPerHariComponent'
import { toast } from 'react-toastify'
import {GetLaporanPerHariAPI} from "service/laporanperhari"
import dayjs from 'dayjs'
export default function LaporanPerHariContainer() {
    const [filterDate, setFilterDate] = useState(dayjs().format("DD"))
    const [filterMonth, setFilterMonth] = useState(dayjs().format("MM"))
    const [filterYears, setFilterYears] = useState(dayjs().format("YYYY"))
    const [metode, setMetode] = useState<string>("TUNAI")
    const handleMetode = (vals:string)=>{
        if(vals){
            setMetode(vals)
        }else{
            setMetode("TUNAI")
        }
    }
    const handleChangeFromDate = (date:any) =>{
        if(date){
            const selectedDate = date.date()
            const selectedMonth = date.month() + 1
            const selectedYears = date.year();
            const filterDateFrom = selectedDate < 10 ? `0${selectedDate}` : selectedDate;
            const filterMonth = selectedMonth < 10 ? `0${selectedMonth}` : selectedMonth;
            setFilterDate(filterDateFrom)
            setFilterMonth(filterMonth)
            setFilterYears(selectedYears.toString())
        }
    }
    const {data: dataLaporanPerHari, isFetching: isFetchingLaporanPerHari, refetch: refetchLaporanPerHari} = useQuery([
        'getLaporanPerHariAPI',
        `2023-11-01`,
    ], GetLaporanPerHariAPI, {
        refetchOnWindowFocus: false,
    })
    console.log("total laporan", dataLaporanPerHari)
    const result = [1,2,3,4,5].reduce((acc:any, golongan:any)=>{
        acc[golongan] = {
            totalE_Toll_Tunai_Flo:0,
            totalKeseluruhan:0,
            totalDinas:0,
            totalE_Flo:0,
            totalTunai:0,
            totalE_Toll:0
        };
        return acc
    },{})
   dataLaporanPerHari?.data?.rows?.rows.forEach((row: any) => {
    if (row.Golongan === 1) {
        const golonganPertama:any = row.Golongan;

        result[golonganPertama].totalE_Toll_Tunai_Flo += 
            row?.Tunai + row?.eMandiri + row?.eBri + row?.eBni + row?.eBca + row?.eNobu + row?.eDKI + row?.eMega + row?.eFlo;

        result[golonganPertama].totalKeseluruhan += 
            row?.Tunai + row?.eMandiri + row?.eBri + row?.eBni + row?.eBca + row?.eNobu + row?.eDKI + row?.eMega + row?.eFlo;

        result[golonganPertama].totalDinas += row?.DinasOpr + row?.DinasMitra + row?.DinasKary;

        result[golonganPertama].totalE_Flo += row?.eFlo;

        result[golonganPertama].totalTunai += row?.Tunai;

        result[golonganPertama].totalE_Toll += 
             row?.eMandiri + row?.eBri + row?.eBni + row?.eBca + row?.eNobu + row?.eDKI + row?.eMega + row?.eFlo;
    }
    if (row.Golongan === 2) {
    const golonganKedua:any = row.Golongan;

    result[golonganKedua].totalE_Toll_Tunai_Flo += 
        row?.Tunai + row?.eMandiri + row?.eBri + row?.eBni + row?.eBca + row?.eNobu + row?.eDKI + row?.eMega + row?.eFlo;

    result[golonganKedua].totalKeseluruhan += 
        row?.Tunai + row?.eMandiri + row?.eBri + row?.eBni + row?.eBca + row?.eNobu + row?.eDKI + row?.eMega + row?.eFlo;

    result[golonganKedua].totalDinas += row?.DinasOpr + row?.DinasMitra + row?.DinasKary;

    result[golonganKedua].totalE_Flo += row?.eFlo;

    result[golonganKedua].totalTunai += row?.Tunai;

    result[golonganKedua].totalE_Toll += 
            row?.eMandiri + row?.eBri + row?.eBni + row?.eBca + row?.eNobu + row?.eDKI + row?.eMega + row?.eFlo;
    }
    if (row.Golongan === 3) {
    const golonganKetiga:any = row.Golongan;

    result[golonganKetiga].totalE_Toll_Tunai_Flo += 
        row?.Tunai + row?.eMandiri + row?.eBri + row?.eBni + row?.eBca + row?.eNobu + row?.eDKI + row?.eMega + row?.eFlo;

    result[golonganKetiga].totalKeseluruhan += 
        row?.Tunai + row?.eMandiri + row?.eBri + row?.eBni + row?.eBca + row?.eNobu + row?.eDKI + row?.eMega + row?.eFlo;

    result[golonganKetiga].totalDinas += row?.DinasOpr + row?.DinasMitra + row?.DinasKary;

    result[golonganKetiga].totalE_Flo += row?.eFlo;

    result[golonganKetiga].totalTunai += row?.Tunai;

    result[golonganKetiga].totalE_Toll += 
            row?.eMandiri + row?.eBri + row?.eBni + row?.eBca + row?.eNobu + row?.eDKI + row?.eMega + row?.eFlo;
    }
    if (row.Golongan === 4) {
    const golonganEmpat:any = row.Golongan;

    result[golonganEmpat].totalE_Toll_Tunai_Flo += 
        row?.Tunai + row?.eMandiri + row?.eBri + row?.eBni + row?.eBca + row?.eNobu + row?.eDKI + row?.eMega + row?.eFlo;

    result[golonganEmpat].totalKeseluruhan += 
        row?.Tunai + row?.eMandiri + row?.eBri + row?.eBni + row?.eBca + row?.eNobu + row?.eDKI + row?.eMega + row?.eFlo;

    result[golonganEmpat].totalDinas += row?.DinasOpr + row?.DinasMitra + row?.DinasKary;

    result[golonganEmpat].totalE_Flo += row?.eFlo;

    result[golonganEmpat].totalTunai += row?.Tunai;

    result[golonganEmpat].totalE_Toll += 
            row?.eMandiri + row?.eBri + row?.eBni + row?.eBca + row?.eNobu + row?.eDKI + row?.eMega + row?.eFlo;
    }
    if (row.Golongan === 5) {
    const golonganLima:any = row.Golongan;

    result[golonganLima].totalE_Toll_Tunai_Flo += 
        row?.Tunai + row?.eMandiri + row?.eBri + row?.eBni + row?.eBca + row?.eNobu + row?.eDKI + row?.eMega + row?.eFlo;

    result[golonganLima].totalKeseluruhan += 
        row?.Tunai + row?.eMandiri + row?.eBri + row?.eBni + row?.eBca + row?.eNobu + row?.eDKI + row?.eMega + row?.eFlo;

    result[golonganLima].totalDinas += row?.DinasOpr + row?.DinasMitra + row?.DinasKary;

    result[golonganLima].totalE_Flo += row?.eFlo;

    result[golonganLima].totalTunai += row?.Tunai;

    result[golonganLima].totalE_Toll += 
            row?.eMandiri + row?.eBri + row?.eBni + row?.eBca + row?.eNobu + row?.eDKI + row?.eMega + row?.eFlo;
    }
    });

    console.log("result", result)
    
    const columnHeader =[
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
      header: 'GERBANG',
      accessorKey: 'IdGerbang',
      enableSorting: true,
      centerHeader: true,
      cell: (row: any) => {
        return <div className="text-left">{row.getValue()}</div>
      },
    },
    {
      header: 'GARDU',
      accessorKey: 'IdGardu',
      enableSorting: true,
      centerHeader: true,
      cell: (row: any) => {
        return <div className="text-left">{row.getValue()}</div>
      },
    },
    {
      header: 'Hari',
      accessorKey: 'Tanggal',
      enableSorting: true,
      centerHeader: true,
      cell: (row: any) => {
        const rowData = row.row.original;
        return <div className="text-left">{dayjs(rowData?.Tanggal).format("dddd")}</div>
      },
    },
    {
      header: 'Tanggal',
      accessorKey: 'Tanggal',
      enableSorting: true,
      centerHeader: true,
      cell: (row: any) => {
        const rowData = row.row.original;
        return <div className="text-left">{dayjs(rowData?.Tanggal).format("DD-MM-YYYY")}</div>
      },
    },
    {
      header: 'Gol I',
      accessorKey: 'GolonganI',
      enableSorting: true,
      centerHeader: true,
      cell: (row: any) => {
        const rowData = row.row.original;
        return <div className="text-left">{result?.I?.totalE_Toll_Tunai_Flo}</div>
      },
    },
    ]
  return (
    <LaporanPerHariComponent/>
  )
}

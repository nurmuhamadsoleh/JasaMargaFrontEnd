import {
  BarChartOutlined,
  CloseOutlined,
  DashOutlined,
  DashboardFilled,
  DownOutlined,
  LeftCircleFilled,
  LogoutOutlined,
  ProfileOutlined,
  RightCircleFilled,
  SettingFilled,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Button, Drawer, Dropdown, Menu, Space } from 'antd'
import React, {useState} from 'react'

import Image from 'next/image'
import JasaMarga from "assets/images/jasaMarga.png"
import Link from 'next/link'
import { MenuProps } from 'antd/lib'
import { useRouter } from 'next/router'

require('dayjs/locale/id')
interface IProps {
  children: any
}
export default function Template(props: IProps) {
  const { children } = props
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [openLaporan, setOpenLaporan] = useState(false)
  const chaildItems: MenuProps['items'] = [
    {
      key: '/laporan Per Hari',
      label: (
        <Link href={"/laporanPerHari"} replace className="hover:!text-black font-medium cursor-pointer">
          Laporan Per Hari
        </Link>
      )
    }
  ]
  const items: MenuProps['items'] = [
    {
      key: '/dahsboard',
      label: (
        <Link href={"/dashboard"} replace className="!text-white font-medium cursor-pointer hover:!text-black">
          <div className='flex gap-2 w-1/2'>
          <DashboardFilled className='text-white text-lg'/>
          Dashboard
          </div>
        </Link>
      )
    },
    {
      key: '/laporan',
      label: (
        <div className='flex gap-2'>
          <span className='text-white hover:!text-black'><BarChartOutlined className='!text-white text-lg pr-2' onClick={()=> setOpenLaporan(!openLaporan)}/>Laporan Lalin</span><Dropdown menu={{items: chaildItems}} autoFocus trigger={['hover']} onOpenChange={()=> setOpenLaporan(!openLaporan)} open={openLaporan}>
            <DownOutlined className='text-lg text-white' />
          </Dropdown>
        </div>
      )
    },
    {
      key: '/mastergerbang',
      label: (
        <Link
          href={"/mastergerbang"}
          replace
          className="!text-white font-medium cursor-pointer hover:!text-black"
        >
          <div className="flex gap-2 items-center">
            <SettingOutlined className="text-white text-lg" />
            Master Gerbang
          </div>
        </Link>
      )
    }
  ]
  const userMenu: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className="flex items-center gap-2 font-medium cursor-pointer">
          <UserOutlined className='text-blue-700 text-lg'/>
          Account
        </div>
      )
    },
    {
      key: '2',
      label: (
        <div className="flex items-center gap-2 font-medium cursor-pointer" onClick={()=> router.push("/login")}>
          <LogoutOutlined className='text-red-600 text-lg'/>
          Logout
        </div>
      )
    }
  ]
  return (
    <>
     <div className="bg-blue-600 text-white h-[60px] fixed top-0 left-0 right-0 text-xl w-full flex items-center z-20 justify-between">
        {/* Bagian kiri: Logo */}
        <div className="flex items-center">
          <Space>
            <Image
            src={JasaMarga}
            alt="Jasa Marga"
            width={230}
            height={80}
            className="object-contain rounded-md bg-transparent"
          />
            <Space>
              <Button
                className="mr-5"
                icon={open ? <LeftCircleFilled className="text-white" style={{ fontSize: '40px' }} /> : <RightCircleFilled className="text-white" style={{ fontSize: '40px' }} />} // Ubah ukuran ikon
                type="text"
                size="large"
                onClick={() => setOpen(!open)}
              />

              <Drawer
                className="!bg-blue-800 !text-white text-3xl"
                placement="left"
                closable={true}
                closeIcon={<CloseOutlined style={{ color: 'white', fontSize: '20px' }} />} // Ikon Close diubah warna dan ukuran
                open={open}
                onClose={() => setOpen(false)}
                width={250} // Lebar Drawer lebih besar
              >
                <Menu
                  mode="inline"
                  items={items}
                  className="h-[80vh] bg-blue-800 !px-0 !w-auto !border-0 text-blue-700 font-medium"
                />
              </Drawer>
            </Space>
          </Space>
        </div>

        {/* Bagian kanan: Profil pengguna dan tombol logout */}
        <div className="flex items-center gap-3 pr-12">
          <Dropdown menu={{ items: userMenu }}>
            <div className="flex items-center cursor-pointer">
              <UserOutlined className="text-3xl text-white" />
              <p className="text-sm md:text-base">Nur M Soleh</p>
            </div>
          </Dropdown>
          <ProfileOutlined className="text-3xl text-white" />
        </div>
      </div>
      {children}
    </>
  )
}

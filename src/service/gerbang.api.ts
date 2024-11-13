import { UseBaseQueryOptions } from '@tanstack/react-query'
import axios from "axios";

export async function GetGerbangAPI(params: UseBaseQueryOptions): Promise<any[]> {
  const [ 
    // eslint-disable-next-line no-unused-vars
    _queryKey, id, idCabang, namaCabang, namaGerbang] =
    params.queryKey || [];
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/api/gerbangs?`,{
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTdXBlciBBZG1pbiIsImlhdCI6MTczMTQzNzIwOCwiZXhwIjoxNzMxNDQwODA4fQ.eEeVg8na1-OjM4-pLGKnZhbXb_4zLKYXatql6gJy5ds",
      },
      params:{
        id: id || "",
        idCabang: idCabang || "",
        NamaCabang: namaCabang || "",
        NamaGerbang: namaGerbang || ""
      }
    }
  );
  return data;
}
export async function DeleteGerbangAPI(params: any) {
  const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_API}/api/gerbangs/`, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTdXBlciBBZG1pbiIsImlhdCI6MTczMTQzNzIwOCwiZXhwIjoxNzMxNDQwODA4fQ.eEeVg8na1-OjM4-pLGKnZhbXb_4zLKYXatql6gJy5ds",
    },
    data: params
  });
  return data;
}
export async function UpdateGerbangAPI(params: any){
  const { data } = await axios.put(`${process.env.NEXT_PUBLIC_API}/api/gerbangs/`,params,
  {
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTdXBlciBBZG1pbiIsImlhdCI6MTczMTQzNzIwOCwiZXhwIjoxNzMxNDQwODA4fQ.eEeVg8na1-OjM4-pLGKnZhbXb_4zLKYXatql6gJy5ds",
      },
  })
  return data
}
export async function AddGerbangAPI(params: any){
  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/api/gerbangs/`,params,
  {
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTdXBlciBBZG1pbiIsImlhdCI6MTczMTQzNzIwOCwiZXhwIjoxNzMxNDQwODA4fQ.eEeVg8na1-OjM4-pLGKnZhbXb_4zLKYXatql6gJy5ds",
      },
  })
  return data
}
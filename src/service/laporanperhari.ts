import { UseBaseQueryOptions } from '@tanstack/react-query'
import axios from "axios";
import dayjs from 'dayjs';

export async function GetLaporanPerHariAPI(params: UseBaseQueryOptions): Promise<any> {
  const [ 
    // eslint-disable-next-line no-unused-vars
    _queryKey, tanggal] =
    params.queryKey || [];
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/api/lalins?`,{
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJTdXBlciBBZG1pbiIsImlhdCI6MTczMTQzNzIwOCwiZXhwIjoxNzMxNDQwODA4fQ.eEeVg8na1-OjM4-pLGKnZhbXb_4zLKYXatql6gJy5ds",
      },
      params:{
        tanggal: tanggal || dayjs().format("YYYY-MM-DD")
      }
    }
  );
  return data;
}
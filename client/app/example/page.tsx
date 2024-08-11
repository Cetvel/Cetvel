import axios from "axios";
import { cookies } from "next/headers"; // Next.js 13+ için geçerli

export default async function Page() {
    const authToken = cookies().get("__session")?.value; // __session olarak saklanan oturum çerezi örneği
    const dataAxiosPromise = await axios.get("http://localhost:3000/api/user/info",{
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        },
    })
    const dataAxios = await dataAxiosPromise.data;

    return (
        <div>
            <h1>{JSON.stringify(dataAxios)}</h1>
        </div>
    );
}

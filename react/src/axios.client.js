import axios from "axios"

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
})


axiosClient.interceptors.request.use((config)=>{
    const token = localStorage.getItem('Access_Token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

axiosClient.interceptors.response.use((response)=> {
    return response
},(error)=> {
    try {
        if(response.status === 401){
            localStorage.removeItem('Access_Token')
        }
    } catch (error) {
        throw error;
    
    }
})

export default axiosClient
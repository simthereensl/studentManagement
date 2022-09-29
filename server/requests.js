// 引入 axios
import axios from 'axios'

const requests = axios.create({
    // 配置基础路径
    baseURL:'http://127.0.0.1',
    timeout:3000,
    // 请求头
    /* headers:{} */
})

// 配置拦截器
requests.interceptors.request.use(config => {
    // 请求带token
    /* config.headers.Authorization = window.sessionStorage.getItem('token') */
    return config
})

// 对应拦截器
requests.interceptors.response.use((res) => {
    // 请求成功的回调函数
    return  res.data;
},() => {
    // 请求失败的回调函数
    return Promise.reject('fail')
})
// 对外暴露
export default requests;

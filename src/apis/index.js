import axios from 'axios';
import { TokenRepository } from 'repository/TokenRepository';

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    // url 숨김과 동시에 baseURL을 만들어 냄
    // withCredentials: true,
    // 백엔드에서 보내주는 쿠키 값을 사용하겠다는 설정

    // 헤더 설정부터 시작해서 다양한 옵션들이 존재하니까
    // 경우에 따라 옵션을 사용자 지정으(여러분들 마음대로)로 설정하여
    // 초기 config를 만들 수 있다
});

// refrsh token
// p.s
// axiosInstance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error) => {
//         const originalRequest = error.config;
//         if (error.response.data === 'token expired') {
//             /*
//             만약 refresh 토큰이 있는지 확인
//             refresh 토큰으로 access_token을 재발급 (await)
//             그리고 그 access_token을 다시 TokenRepository.setToken();
//             header에 심이서 원래 요청을 다시 요청
//             originalRequest._retry =true;
//             */
//         }
//     }
// );
// 요청전에(interceptors) , config -> axios에 설정 
axiosInstance.interceptors.request.use((config) => {
    const token = TokenRepository.getToken();
    // 토큰값이 있다면 
    if (token) {
        config.headers.Authorization = `${token}`;
    }
    // 로컬스토리지에 토큰이 있다면 요청의 헤더에 토큰을 심어서 보내라
    return config;
});

import { axiosInstance } from 'apis';

const path = '/user';

// 
export const AuthApi = {
    login: ({ email, password }) => {
        return axiosInstance.post(path + '/login', { email, password });
        // .then((res) => res)
        // .catch((err) => {
        //     throw new Error(err.response.data.error);
        //     // 상위 예외처리문으로 예외를 넘긴다.
        // });
    },
    signup: ({ email, password }) => {
        return axiosInstance.post(path + '/signup', { email, password });
    },
    logout: () =>{
        return axiosInstance.post(path + '/logout')
    }
};

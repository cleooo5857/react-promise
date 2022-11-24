import { axiosInstance } from "apis";

const path = '/todo';

export const TodoApi = {
    createTodo:() =>{
        return axiosInstance.get(path)
    },
    getTodo:({content}) =>{
        return axiosInstance.post(path, { content })
    },
    updateTodo:()=>{
        return axiosInstance.put(path)
    },
    deleteTodo:()=>{
    }
}
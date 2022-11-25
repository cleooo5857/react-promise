import { axiosInstance } from "apis";

const path = '/todo';

export const TodoApi = {
    createTodo:() =>{
        return axiosInstance.get(path)
    },
    getTodo:({content}) =>{
        return axiosInstance.post(path, { content })
    },
    updateTodo:({id,data})=>{
        return axiosInstance.put(path + '/' + id , data)
    },
    deleteTodo:({id})=>{
        return axiosInstance.delete(path + '/' + id)
            
    }
}
import { axiosInstance } from 'apis';
import { TodoApi } from 'apis/todoApi';
import axios from 'axios';
import useInput from 'hooks/useInput';
import { useState } from 'react';
import styled from 'styled-components';

function Todo({ todo, todoList, setTodoList }) {
    /*
     *  flag를 눌렀을 때 일어나는 이벤트
            falg를 눌르면 t -> f
                          f -> t 부정이벤트

            부정값을 보내면 됩니다.   (!todo.flag)
            부정값으로 업데이트 됩니다.

            ** 백엔드 통신 ---> 상태를 바꿉니다 --> 결과를 줌
            그리고 그 결과를 받으면 업데이트

            프론트의 state를 바꾸는 실제 값이 바뀌는게 아니라
            사실 눈속임


     *  삭제 버튼을 눌렀을 때 일어나는 이벤트
            id값 주고 db에서 삭제하고 -> 응답(id) 받고 -> filter


     *  수정 버튼을 눌렀을 때 일어나는 이벤트
            textarea로 바꾸고 onClcik 이벤트도 수정 [삼항연산자]
            
            textarea 값, id, state를 인자(input)으로 받아서
            백엔드에게 전달하고 응답 받고 수정
     */

    const [edit, setEdit] = useState(false);
    const [newTodo, onChangeNewTodo] = useInput(todo.content);

    const onChnageEdit = () => {
        setEdit(true);
    };

    const onDeleteTodo = async() => {
        // 어떤 값을? = > id
        // 결과값 -> 성공, 실패
        // 성공? -> 백엔드 응답 값? (삭제한 todo의 id) -> filter(id)
        // 실패? -> ex. 이미 없는 todo입니다. <-- error => alert(modal)
        // axiosInstance
        //     .delete(`/todo/${todo.id}`)
        //     .then((res) => {
        //         if (res.status === 200) {
        //             // todoList.pop(); => 원본훼손
        //             // todolist.filter ==> 단지 보여주는거 제거된 배열을
        //             // 제거된 새로운 배열을 변수에 담는 것 (깊은 복사)

        //             const todoList_d = todoList.filter((todo) => todo.id !== res.data.data);
        //             setTodoList(todoList_d);
        //         }
        //     })
        //     .catch((err) => {
        //         console.error(err);
        //     });
        try{
            const id = todo.id
            const res = await TodoApi.deleteTodo({id});
            if (res.status === 200) {
                const todoList_d = todoList.filter((todo) => todo.id !== res.data.data);
                setTodoList(todoList_d);
            }
        }catch(err){
            console.log(err);
        }
    };
    const onUpdateTodo = async () => {
        /* 
        어떤값?
        id, content, flag => 어떤 값이 응답? 
        => find(id), 찾은 state의 content, flag값을 수정
        */

        if (todo.content === newTodo) return setEdit(false);

        // const data = {
        //     content: newTodo,
        //     flag: todo.flag,
        // };

        // axiosInstance
        //     .put(`/todo/${todo.id}`, data)
        //     .then((res) => {
        //         if (res.status === 200) {
        //             const { data } = res.data;
        //             console.log(data);
        //             const newTodoList = [...todoList];
        //             let todo = newTodoList.find((todo) => todo.id === data.id);
        //             todo.content = data.content;
        //             setTodoList(newTodoList);
        //             setEdit(false);
        //         }
        //     })
        //     .catch((err) => console.error(err));
      
        
        try{
            const data = {
            content: newTodo,
            flag: todo.flag,
            };

            const id = todo.id;
            // console.log({data,id});

            const res = await TodoApi.updateTodo({id,data});
            console.log(res);
            if (res.status === 200) {
                const { data } = res.data;
                console.log(data);
                const newTodoList = [...todoList];
                let todo = newTodoList.find((todo) => todo.id === data.id);
                todo.content = data.content;
                setTodoList(newTodoList);
                setEdit(false);
            }
        }catch(err){
            console.log(err);
        }

    };

    const onUpdateFlag = async() => {
        // const data = {
        //     content: todo.content,
        //     flag: !todo.flag,
        // };

        // axios
        //     .put(`http://localhost:9000/todo/${todo.id}`, data)
        //     .then((res) => {
        //         if (res.status === 200) {
        //             const { data } = res.data;
        //             const newTodoList = [...todoList];
        //             let todo = newTodoList.find((todo) => todo.id === data.id);
        //             todo.flag = data.flag;
        //             setTodoList(newTodoList);
        //         }
        //     })
        //     .catch((err) => console.error(err));
        try{
            const data = {
                content: todo.content,
                flag: !todo.flag,
            };
            const id = todo.id;

            const res  = await TodoApi.updateTodo({id,data})
                if (res.status === 200) {
                const { data } = res.data;
                const newTodoList = [...todoList];
                let todo = newTodoList.find((todo) => todo.id === data.id);
                todo.flag = data.flag;
                setTodoList(newTodoList);
            }
        }catch(err){
            console.log(err);
        }

    };

    return (
        <S.Wrapper>
            <div onClick={onUpdateFlag}>{todo.flag ? '완료' : '미완료'}</div>
            <div>
                {edit ? (
                    <textarea value={newTodo} onChange={onChangeNewTodo}></textarea>
                ) : (
                    todo.content
                )}
            </div>
            <button onClick={onDeleteTodo}>삭제</button>
            {edit ? (
                <button onClick={onUpdateTodo}>완료</button>
            ) : (
                <button onClick={onChnageEdit}>수정</button>
            )}
        </S.Wrapper>
    );
}
export default Todo;

const Wrapper = styled.div`
    display: flex;
    margin: 8px 0;
`;

const S = {
    Wrapper,
};

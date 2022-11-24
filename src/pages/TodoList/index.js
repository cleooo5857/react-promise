import { axiosInstance } from 'apis';
import { TodoApi } from 'apis/todoApi';
import { useEffect, useState } from 'react';
import TodoForm from './components/Form/Form';
import Todo from './components/Todo/Todo';

function TodoListpage() {
    /**
     * 자바스크립트 빌트인 객체 (전역 객체에 포함)
     *  빌트인 객체?
     *    자바스크립트 내장된 함수들이 저장된 객체
     *     ex) console. Math(수학), String(문자열), Number(숫자), Object(객체)...
     */

    const [todoList, setTodoList] = useState([]);

    // 페이지가 처음 열렸을 때
    // 백엔드에게 요청 --> 투두리스트 줘



    useEffect(() => {
        (async () => {
        try{
            const res = await TodoApi.createTodo();
            if(res.status === 200){
                setTodoList(res.data.data)
            }
        } catch(err) {
            console.log(err);
        }
        }) ();
      }, []);

    return (
        <>
            {todoList.map((todo) => (
                <Todo key={todo.id} todo={todo} todoList={todoList} setTodoList={setTodoList} />
            ))}
            <TodoForm todoList={todoList} setTodoList={setTodoList} />
        </>
    );
}
export default TodoListpage;

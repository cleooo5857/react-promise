import { axiosInstance } from 'apis';
import { TodoApi } from 'apis/todoApi';
import useInput from 'hooks/useInput';

function TodoForm({ todoList, setTodoList }) {
    const [todo, onChangeTodo, setTodo] = useInput('');

    // 추가 버튼 눌렀을 때 어떻게 해야할까?
    // 어떤 걸 input으로 삼고 결과값으로 어떻게 해야합니까

    const onClickAddBtn = async () => {
        // ? -> todo -> 성공, 실패
        /* 성공 ->  어떤 결과값? -> todolist 추가
                    결과값의 형태? -> json 형태의 객체
                    {
                        id : DB에 저장된 고유번호
                        content : DB에 저장된 내용
                        flag : 기본값 0
                    }
                    todoList, setTodoList를 props
        */
        // 실패 -> alert 경고창, 에러 페이지로 이동 (500, 404 => 에러페이지)

        // axiosInstance
        //     .post('/todo', { content: todo })
        //     .then((res) => {
        //         if (res.status === 200) {
        //             alert('ADD TODOLIST');
        //             setTodoList([res.data.data, ...todoList]);
        //             setTodo('');
        //         }
        //     })
        //     .catch((err) => console.log(err));
        try{
            const res = await TodoApi.getTodo({content:todo});
            if (res.status === 200) {
                alert('ADD TODOLIST');
                setTodoList([res.data.data, ...todoList]);
                setTodo('');
            }
        } catch(err){
            console.log(err);
        }

    };

    return (
        <>
            <input value={todo} onChange={onChangeTodo} />
            <button onClick={onClickAddBtn}>추가</button>
        </>
    );
}
export default TodoForm;

import TodoListpage from 'pages/TodoList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FullLayout from '../components/Layout/FullLayout';
import HeaderLayout from '../components/Layout/HeaderLayout';
import HomePage from '../pages/Home';
import PrivateRoute from './PrivateRoute';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/*public*/}
                <Route element={<FullLayout />}>
                    <Route path="/" element={<HomePage />} />
                </Route>

                {/*private* PrivateRoute프롭스로 전달받음 /}
                {/* 토큰값이 있으면 outlet 자식요소를 보여주고, 아니면 메인페이지로 가라 */}
                <Route element={<PrivateRoute />}>
                    <Route element={<HeaderLayout />}>
                        <Route path="/todo" element={<TodoListpage />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
export default Router;

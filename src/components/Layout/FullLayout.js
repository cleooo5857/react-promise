import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import LayoutFooter from './Footer/Footer';
import LayoutHeader from './Header/Header';

function FullLayout() {
    return (
        <S.Wrapper>
            <LayoutHeader />
            <Outlet />
            {/* 자식 경로 요소(route)의 컴포넌트를 랜더링 */}
            <LayoutFooter />
        </S.Wrapper>
    );
}
export default FullLayout;

const Wrapper = styled.div`
    min-height: 100vh;
`;

const S = {
    Wrapper,
};

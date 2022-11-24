import { Outlet } from 'react-router-dom';
import LayoutHeader from './Header/Header';
import * as S from './Style';
// Style 폴더의 모든 export를 S라는 객체로 가지고 온다.

function HeaderLayout() {
    return (
        <S.Wrapper>
            <LayoutHeader />
            <Outlet />
        </S.Wrapper>
    )
}
export default HeaderLayout;
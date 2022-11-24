import { useState } from 'react';
import styled from 'styled-components';
import { flexCenter } from '../../libs/styles/common';
import HomeLoginFrom from './componets/Form/Form';
import HomeSignUpModal from './componets/Modal/SignUp';

function HomePage() {
    const [isOpenSignUpModal, setIsOpenSigupModal] = useState(false);

    const onOpenSignUpModal = () => {
        setIsOpenSigupModal(true);
    };

    const onCloseSignUpModal = () => {
        setIsOpenSigupModal(false);
    };

    return (
        <>
            {isOpenSignUpModal && <HomeSignUpModal onCloseSignUpModal={onCloseSignUpModal} />}
            <S.Wrapper>
                <S.MainImageBox></S.MainImageBox>
                <S.Conatiner>
                    <HomeLoginFrom />
                    <p>
                        아직도 회원이 아니신가요?
                        <span onClick={onOpenSignUpModal}> 회원가입 </span>
                    </p>
                </S.Conatiner>
            </S.Wrapper>
        </>
    );
}
export default HomePage;

const Wrapper = styled.div`
    display: flex;
`;
const MainImageBox = styled.div`
    width: 440px;
    height: calc(100vh - 40px);
    background-color: #800080;
`;

const Conatiner = styled.div`
    width: 100%;
    ${flexCenter};
    flex-direction: column;
`;

const S = {
    Wrapper,
    MainImageBox,
    Conatiner,
};

/* 
아토믹디자인패턴
쪼갤 수 있을 때까지 원자단위로 쪼개는 걸 => 유지 보수 힘들어진다 => 빛 좋은 개살구다
원리 상으로는 유지보수 완벽 (단일책임원칙)
*/

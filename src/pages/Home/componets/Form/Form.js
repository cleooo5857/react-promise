import styled from 'styled-components';
import { flexCenter } from 'libs/styles/common';
import { useNavigate } from 'react-router-dom';
import useInput from 'hooks/useInput';
import { axiosInstance } from 'apis';
import { AuthApi } from 'apis/authApi';
import { TokenRepository } from 'repository/TokenRepository';

function HomeLoginFrom() {
    const naviate = useNavigate();

    // login btn click => ?
    /* 
    1. 함수를 만든다.
    2. 어떤 값을 받아서 어떻게 하고 싶으세요?
        - id, pw -> 백엔드와 http message 통신 (axios,fetch) -> 백엔드에 db와 값 비교 후 결과 값 전달

    3. 결과 값에 따라 다른 이벤트
        - 성공 : 로그인 된 상태(세션id)로 메인 페이지로 이동
        - 에러 : alert(에러 메시지)
    */

    // 위의 과정이 내가 모르는 함수들을 사용하는 것이라고 하더라도
    // 위 처럼 설계를 먼저하게 되면 구글링으로도 개발링이 가능
    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');

    const onClickLoginBtn = async (e) => {
        e.preventDefault();
        // e 객체의 기존 속성을 막겠다.
        // form 실행하면 action으로 어딘가에 보내요
        // action을 정의해주지 않았기 때문에 ?로 보내는 것
        // 이 원래의 form의 태그 기능을 막겠다

        /**
         * window.location.href = "/todo"
         * 이렇게 보내면 a 태그로 보낸거랑 똑같다.
         *
         * useNavigate
         * replace => 뒤로가기 못하게 방지
         */

        // 백엔드 통신
        // 성공하면 보내라

        /*
        AuthApi.login({ email, password })
            .then((res) => {
                if (res.status === 200) {
                    return naviate('/todo', { replace: true });
                }
            })
            .catch((err) => console.error(err));
        */

        // 에러가 날 수 있는 문장을 시도
        try {
            // 예외(에러)가 생길 수도 있는 문장
            /*
            백엔드한테 이메일 패스워드 전달 , 백엔드에서 자체적으로 이메일 패스워드 맞다면
            로그인 성공
            */  
            /* 결과값을 res에다 담는다
                여러가지 데이터들이 있지만 백엔드가 전달해준 토큰값으로
                로그인 여부를 판단하기 위해서는 토큰값이 있어야한다.
                토큰값을 웹브라우저 localStorge에 담음 
            */
            const res = await AuthApi.login({ email, password });
            console.log(res)
            if (res.status === 200) {
                TokenRepository.setToken(res.data.data.token);

                if (TokenRepository.getToken()) {
                    naviate('/todo', { replace: true });
                }
            }
        } catch (err) {
            // 만약 에러가난다면 에러를 이렇게 처리할거야
            // 사실 콘솔에러를 찍는 경우는 던질 이유가 없음
            console.error(err);
            alert(err);
            // 에러 바운더링(에러 핸들링)
        }
    };

    return (
        // form타입은 type지정안해주면 첫번째 버튼을 실행됨
        <S.Form onSubmit={onClickLoginBtn}>
            <div>
                <button type="button"></button> {/** form은 첫번째 버튼을 인식 */}
            </div>
            <input type="text" placeholder="아이디" value={email} onChange={onChangeEmail} />
            <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={onChangePassword}
            />
            <button>로그인</button>
            {/** button 태그의 기본 타입은 ??
             *  1. button
             *  2. submit(o)
             */}
        </S.Form>
    );
}
export default HomeLoginFrom;

const Form = styled.form`
    ${flexCenter}
    flex-direction: column;
    & input {
        background-color: #fff;
        border-radius: 2rem;
        outline: none;
        border: #999;
        margin-bottom: 8px;
    }
`;

const S = {
    Form,
};

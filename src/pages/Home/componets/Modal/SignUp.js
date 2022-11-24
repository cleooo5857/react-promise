import styled from 'styled-components';
import { flexCenter, ModalBackground } from 'libs/styles/common';
import useInput from 'hooks/useInput';
import { useEffect, useState } from 'react';
import { axiosInstance } from 'apis';
import { AuthApi } from 'apis/authApi';

function HomeSignUpModal({ onCloseSignUpModal }) {
    /**
     * x버튼을 눌렀을 때 어떤 일이?
     
    모달이 사라져야함 => 모달 사라지게 하려면?
    true -> false
    */

    /**
     * 회원가입 버튼을 누르면 어떤 일이 벌어져야하는가
        id, pw -> 백엔드에 요청(req) -> db에 저장 -> 저장이 성공 했는지 실패 했는지 여부 응답(res)
        성공 --> 회원가입 축하합니다. 모달창 종료
        실패 --> 에러 메시지

        모든 프로그래밍 언어는 
        input -> operate -> output

        내가 원하는 결과값이 무엇인지
        그리고 그 결과값을 위해서 필요한 input이 무엇인지
        마지막으로 input을 어떻게 연산해야 결과 값이 나오는가
     */

    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [error, setError] = useState(false);
    const [errtxt, setErrTxt] = useState(null);

    const onClickSignUpBtn = async () => {
        /* 
        백엔드의 회원가입 rest api 주소가
        http://localhost:9000/user/sign
        */

        // axiosInstance
        //     .post('/user/sign', { email, password })
        //     .then((res) => {
        //         if (!alert(res.data.data)) onCloseSignUpModal();
        //     })
        //     .catch((err) => {
        //         setError(true);
        //         setErrTxt(err.response.data.error);
        //     });

        try {
            console.log(res)
            // 백엔드의 지정되어있는 email,password를 설정되어있는 주소로 보내준다
            const res = await AuthApi.signup({ email, password });
                // 알럿 창이 꺼지면 onCloseSignUpModal(모달창이 꺼지게 하는 함수) 를 실행
            if (!alert(res.data.data)) onCloseSignUpModal();
        } catch (err) {
            setError(true);
            setErrTxt(err.response.data.error);
        }
    };

    useEffect(() => {
        setError(false);
    }, [email, password]); // input에 값이 변경되면(입력되면) useEffect가 실행되면서 setError를 false로 변경
    

    return (
        <S.Wrapper>
            <S.Conatiner>
                <S.Header>
                    <span>SIGNUP</span>
                    <span onClick={onCloseSignUpModal}>X</span>
                </S.Header>
                <S.Content>
                    <input
                        type={'text'}
                        placeholder="아이디를 입력해주세요"
                        value={email}
                        onChange={onChangeEmail}
                    />
                    <input
                        type={'password'}
                        placeholder={'비밀번호를 입력해주세요'}
                        value={password}
                        onChange={onChangePassword}
                    />
                    <button onClick={onClickSignUpBtn}>회원가입</button>
                    {error && <p>{errtxt}</p>}
                </S.Content>
            </S.Conatiner>
        </S.Wrapper>
    );
}
export default HomeSignUpModal;

const Wrapper = styled.div`
    ${ModalBackground};
`;

const Conatiner = styled.div`
    width: 380px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    height: 32px;
    background-color: ${({ theme }) => theme.palette.primary[300]};
    color: #fff;
`;

const Content = styled.div`
    ${flexCenter};
    flex-direction: column;
    padding: 32px 0;

    & input {
        border: 1px solid #999;
        margin-bottom: 8px;
    }
`;

const S = {
    Wrapper,
    Conatiner,
    Header,
    Content,
};

import { AuthApi } from "apis/authApi";
import { flexCenter } from "libs/styles/common";
import { TokenRepository } from "repository/TokenRepository";
import styled from "styled-components";
import {useNavigate} from 'react-router-dom'

function LayoutHeader(tokden) {
    const naviate = useNavigate();
    

    const onclickLogout = () =>{
        const Removetoken = TokenRepository.getToken()
        TokenRepository.removeToken(Removetoken);

        if(!Removetoken){
            naviate('/', { replace: true });
            alert('로그아웃 되었습니다.')
        }
    }

    return (
        <>
            <Wrapper>
                <div>HEADER</div>
                <button onClick={onclickLogout}>로그아웃</button>
            </Wrapper>
        </>
    )
}
export default LayoutHeader;

const Wrapper = styled.div`
${flexCenter}
justify-content: space-between;
`
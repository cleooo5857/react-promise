import { AuthApi } from "apis/authApi";
import { flexCenter } from "libs/styles/common";
import { TokenRepository } from "repository/TokenRepository";
import styled from "styled-components";
import {useNavigate} from 'react-router-dom'
import { useState } from "react";


function LayoutHeader(tokden) {
    const naviate = useNavigate();

    const onclickLogout = async () =>{
        try{
        const res = await AuthApi.logout();
        const Removetoken =  TokenRepository.getToken()
        console.log(res);
        if(res.status === 201){
            TokenRepository.removeToken(Removetoken)
                naviate('/', { replace: true });
                alert('로그아웃 되었습니다.')
            }
        }catch(err) {
            console.log(err);
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
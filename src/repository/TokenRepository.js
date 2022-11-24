const TOKEN_KEY = 'tokden';

export const TokenRepository = {
    setToken: (token) => {
        // sessionStorage
        // 로걸스토리지에 토큰값을 넣는방법
        localStorage.setItem(TOKEN_KEY, token);
    },
    // 중복된 토큰 키 값이 set되면 update

    getToken: () => {
        return localStorage.getItem(TOKEN_KEY);
    },
    removeToken: (removetoken) => {
        localStorage.removeItem(TOKEN_KEY,removetoken);
    },
};

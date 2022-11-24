import { useState } from 'react';

const useInput = (initalValue = null) => {
    const [value, setValue] = useState(initalValue);
    const onChange = (e) => {
        setValue(e.target.value);
    };
    return [value, onChange, setValue];
};
export default useInput;

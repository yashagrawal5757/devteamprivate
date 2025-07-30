import { useState } from 'react';

const useToggle = () => {
    const [isActive, setIsActive] = useState<boolean>(false);

    const toggle = () => {
        setIsActive((previousValue) => !previousValue);
    };

    const setToggle = (value: boolean) => {
        setIsActive(value);
    };

    return { isActive, toggle, setToggle };
};

export default useToggle;

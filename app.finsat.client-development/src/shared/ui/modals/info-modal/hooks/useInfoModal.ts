import { useState } from 'react';
import useToggle from '../../../../hooks/useToggle';

const useInfoModal = () => {
    const { isActive: isModalActive, setToggle } = useToggle();

    const setModalValue = (value: boolean) => {
        setToggle(value);
    };

    return { isModalOpen: isModalActive, setModalValue };
};

export default useInfoModal;

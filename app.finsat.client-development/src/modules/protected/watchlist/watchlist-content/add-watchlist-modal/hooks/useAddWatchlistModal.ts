import useToggle from '@hooks/useToggle';

const useAddWatchlistModal = () => {
    const {
        isActive: isAddNewWatchlistActive,
        setToggle: setAddNewWatchlistToggle
    } = useToggle();

    return { isAddNewWatchlistActive, setAddNewWatchlistToggle };
};

export default useAddWatchlistModal;

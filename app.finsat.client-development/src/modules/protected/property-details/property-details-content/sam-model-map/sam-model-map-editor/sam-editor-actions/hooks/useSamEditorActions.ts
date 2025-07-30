import useToggle from '@hooks/useToggle';

const useSamEditorActions = () => {
    const { isActive: isPolygonDropdownOpen, setToggle: setPolygonDropdownOpen } = useToggle();
    const { isActive: isPolygonPointDropdownOpen, setToggle: setIsPolygonPointDropdownOpen } = useToggle();
    const { isActive: isPolygonDetectionDropdownOpen, setToggle: setIsPolygonDetectionDropdownOpen } = useToggle();

    const togglePolygonDropdown = () => {
        if (isPolygonDropdownOpen) {
            setPolygonDropdownOpen(false);
            return;
        }

        closeDropdowns();
        setPolygonDropdownOpen(true);
    };

    const togglePolygonPointDropdown = () => {
        if (isPolygonPointDropdownOpen) {
            setIsPolygonPointDropdownOpen(false);
            return;
        }

        closeDropdowns();
        setIsPolygonPointDropdownOpen(true);
    };

    const togglePolygonDetectionDropdown = () => {
        if (isPolygonDetectionDropdownOpen) {
            setIsPolygonDetectionDropdownOpen(false);
            return;
        }

        closeDropdowns();
        setIsPolygonDetectionDropdownOpen(true);
    };

    const closeDropdowns = () => {
        setPolygonDropdownOpen(false);
        setIsPolygonPointDropdownOpen(false);
        setIsPolygonDetectionDropdownOpen(false);
    };

    return {
        isPolygonDropdownOpen,
        isPolygonPointDropdownOpen,
        isPolygonDetectionDropdownOpen,
        togglePolygonDropdown,
        togglePolygonPointDropdown,
        togglePolygonDetectionDropdown
    }
}

export default useSamEditorActions
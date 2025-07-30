import useToggle from '@hooks/useToggle';

/**
 * Custom hook for managing the state and actions of polygon-related dropdowns
 * in the Explore SAM Model Editor.
 *
 * This hook provides toggling and closing logic for three dropdowns:
 * - Polygon Dropdown
 * - Polygon Point Dropdown
 * - Polygon Detection Dropdown
 *
 * Each dropdown can be opened or closed independently, but opening one will
 * close the others to ensure only one is open at a time.
 *
 * @returns An object containing:
 * - `isPolygonDropdownOpen`: boolean indicating if the polygon dropdown is open
 * - `isPolygonPointDropdownOpen`: boolean indicating if the polygon point dropdown is open
 * - `isPolygonDetectionDropdownOpen`: boolean indicating if the polygon detection dropdown is open
 * - `togglePolygonDropdown`: function to toggle the polygon dropdown
 * - `togglePolygonPointDropdown`: function to toggle the polygon point dropdown
 * - `togglePolygonDetectionDropdown`: function to toggle the polygon detection dropdown
 */
const useExploreSamEditorActions = () => {
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

export default useExploreSamEditorActions
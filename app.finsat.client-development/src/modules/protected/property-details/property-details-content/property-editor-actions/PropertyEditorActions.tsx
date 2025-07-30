import React, { useMemo, useState } from 'react';
import usePropertyEditor from 'modules/protected/property-details/hooks/property-editor/usePropertyEditor';
import {
    PolygonAlignmentMode,
    PolygonOperationMode,
    PropertyEditorDetectionMode,
    PropertyEditorMode,
    PropertyEditorModelMode,
    PropertyMapMode
} from 'modules/protected/property-details/state/property-editor/PropertyEditorDefaults';
import { GrTrash, GrUndo } from 'react-icons/gr';
import { GoDotFill } from 'react-icons/go';
import { FaChevronDown } from 'react-icons/fa';
import usePropertyFootprint from 'modules/protected/property-details/hooks/property-footprint/usePropertyFootprint';
import usePropertyEditorActionsStack from '../../hooks/property-editor/usePropertyEditorActionsStack';

type PropertyEditorActionsProps = {
    onDetectObsticles: () => void;
};

const PropertyEditorActions = ({
    onDetectObsticles
}: PropertyEditorActionsProps) => {
    const {
        propertyEditor,
        setEditorMode,
        setOperationMode,
        setAlignmentMode,
        setDetectionMode,
        resetMode,
        handleUndo
    } = usePropertyEditor();

    const { footprint } = usePropertyFootprint();
    const { actionsStack } = usePropertyEditorActionsStack();

    const [isDetectionModeDropdownOpen, setDetectionModeDropdownOpen] = useState<boolean>(false);

    const [isMoveDropdownOpen, setMoveDropdownOpen] = useState<boolean>(false);

    const [isAddRemoveDropdownOpen, setAddRemoveDropdownOpen] =
        useState<boolean>(false);

    const closeDropdowns = () => {
        setDetectionModeDropdownOpen(false);
        setMoveDropdownOpen(false);
        setAddRemoveDropdownOpen(false);
    };

    const toggleMoveDropdown = () => {
        if (isMoveDropdownOpen) {
            setMoveDropdownOpen(false);
            return;
        }

        closeDropdowns();
        setMoveDropdownOpen(true);
    };

    const toggleAddRemoveDropdown = () => {
        if (isAddRemoveDropdownOpen) {
            setAddRemoveDropdownOpen(false);
            return;
        }

        closeDropdowns();
        setAddRemoveDropdownOpen(true);
    };

    const toggleDetectionModeDropdown = () => {
        if (isDetectionModeDropdownOpen) {
            setDetectionModeDropdownOpen(false);
            return;
        }

        closeDropdowns();
        setDetectionModeDropdownOpen(true);
    };

    const isEditorMode = useMemo(
        () => propertyEditor.propertyMapMode === PropertyMapMode.EDITOR,
        [propertyEditor]
    );

    const isParameterEditorMode = useMemo(
        () => propertyEditor.propertyEditorMode === PropertyEditorMode.SHAPE,
        [propertyEditor]
    );

    const isOperationEditMode = useMemo(
        () => propertyEditor.polygonOperationMode === PolygonOperationMode.EDIT,
        [propertyEditor]
    );

    const isOperationAddMode = useMemo(
        () =>
            propertyEditor.polygonOperationMode ===
            PolygonOperationMode.ADD_POLYGON,
        [propertyEditor]
    );

    const isOperationRemoveMode = useMemo(
        () =>
            propertyEditor.polygonOperationMode === PolygonOperationMode.REMOVE_POLYGON,
        [propertyEditor]
    );

    const isMoveAlignmentMode = useMemo(
        () => propertyEditor.polygonAlignmentMode === PolygonAlignmentMode.MOVE,
        [propertyEditor]
    );

    const isMoveAddPointMode = useMemo(
        () => propertyEditor.polygonAlignmentMode === PolygonAlignmentMode.ADD_POINT,
        [propertyEditor]
    );

    const isSAMModelMode = useMemo(
        () => propertyEditor.propertyEditorModelMode === PropertyEditorModelMode.SAM,
        [propertyEditor]
    )

    const isDetectionHoverMode = useMemo(
        () => propertyEditor.detectionMode === PropertyEditorDetectionMode.HOVER,
        [propertyEditor]
    )

    const isDetectionBoxMode = useMemo(
        () => propertyEditor.detectionMode === PropertyEditorDetectionMode.BOX,
        [propertyEditor]
    )
    const hasFootprint = useMemo(
        () => footprint.shapes.length > 0,
        [footprint]
    );

    return (
        <>
            {isEditorMode && (
                <>
                    {
                        hasFootprint && (
                            <div className="flex flex-row bg-white py-1 rounded mt-2 text-sm justify-between">
                                <div
                                    className={`flex flex-row w-1/2 items-center justify-center cursor-pointer text-gray-700 mx-1.5 py-1.5 rounded`}
                                    onClick={() =>
                                        !isParameterEditorMode &&
                                        setEditorMode(PropertyEditorMode.SHAPE)
                                    }
                                    style={{
                                        backgroundColor: isParameterEditorMode
                                            ? "rgba(54,234,197, 0.8 )"
                                            : undefined
                                    }}
                                >
                                    <GoDotFill />
                                    <p className="text-xs ml-0.5 px-0.5">Perimeter</p>
                                </div>
                                <div className="w-[1px] h-[25px] bg-gray-300"></div>
                                <div
                                    className={`flex flex-row w-1/2 items-center justify-center cursor-pointer text-red-500 mx-1.5 py-1 rounded ${!isParameterEditorMode ? 'bg-red-200' : ''}`}
                                    onClick={() =>
                                        isParameterEditorMode &&
                                        setEditorMode(PropertyEditorMode.OBSTICLE)
                                    }
                                >
                                    <GoDotFill />
                                    <p className="text-xs ml-0.5 px-0.5">
                                        Obstructions
                                    </p>
                                </div>
                            </div>
                        )
                    }
                    <div className="flex flex-row bg-white py-1 rounded mt-2 justify-between">
                        <div className="flex flex-row w-1/4 justify-center items-center relative">
                            {/* {isSAMModelMode ? ( */}
                            <div className="rounded px-1 py-0.5 cursor-pointer">
                                {/* {isDetectionHoverMode && (
                                        <img
                                            src="/sam-hover-active.svg"
                                            alt="Tap icon"
                                            className="w-4 h-4"
                                        />
                                    )}
                                    {isDetectionBoxMode && (
                                        <img
                                            src="/sam-box-active.svg"
                                            alt="Curve icon"
                                            className="w-4 h-4"
                                        />
                                    )}
                                     */}
                                <img
                                    src="/ai-icon.svg"
                                    alt="Tap icon"
                                    className="w-5 h-5"
                                />
                            </div>
                            {/* ) : (
                                <img
                                    onClick={() => {
                                        setDetectionMode(
                                            isDetectionHoverMode
                                                ? PropertyEditorDetectionMode.HOVER
                                                : PropertyEditorDetectionMode.BOX
                                        )
                                        setDetectionModeDropdownOpen(false);
                                    }}
                                    src={
                                        isDetectionHoverMode
                                            ? '/sam-hover.svg'
                                            : '/sam-box.svg'
                                    }
                                    alt="Tap icon"
                                    className="w-4 h-4 cursor-pointer"
                                />
                            )} */}
                            <div>
                                <div
                                    id="dropdownBgHoverButton"
                                    data-dropdown-toggle="dropdownBgHover"
                                    className="p-1 cursor-pointer"
                                    onClick={toggleDetectionModeDropdown}
                                >
                                    <FaChevronDown size={8} />
                                </div>
                                <div
                                    id="dropdownBgHover"
                                    className={`absolute top-7 left-0 ${isDetectionModeDropdownOpen ? '' : 'hidden'} z-10 max-h-48 w-32 overflow-y-auto bg-white rounded border border-gray-300 mt-1`}
                                >
                                    <div className="relative flex flex-grow flex-col text-x">
                                        <div
                                            className="flex flex-row cursor-pointer"
                                            onClick={() => {
                                                setDetectionMode(
                                                    PropertyEditorDetectionMode.HOVER
                                                );
                                                // toggleMoveDropdown();
                                                toggleDetectionModeDropdown();

                                            }}
                                        >
                                            <img
                                                src="/sam-hover.svg"
                                                alt="Tap icon"
                                                className="w-4 h-4 ml-2 my-2"
                                            />
                                            <p className="px-2 my-2">
                                                Hover over roof
                                            </p>
                                        </div>
                                        <hr />
                                        <div
                                            className="flex flex-row cursor-pointer"
                                            onClick={() => {
                                                setDetectionMode(
                                                    PropertyEditorDetectionMode.BOX
                                                );
                                                // toggleMoveDropdown();
                                                toggleDetectionModeDropdown();
                                            }}
                                        >
                                            <img
                                                src="/sam-box.svg"
                                                alt="Curve icon"
                                                className="w-4 h-4 ml-2 my-2"
                                            />
                                            <p className="px-2 my-2">
                                                Draw a box
                                            </p>
                                        </div>
                                        {!isParameterEditorMode && (
                                            <>
                                                <hr />
                                                <div
                                                    className="flex flex-row cursor-pointer"
                                                    onClick={() => {
                                                        onDetectObsticles();
                                                        toggleDetectionModeDropdown();
                                                    }}
                                                >
                                                    <img
                                                        src="/ai.svg"
                                                        alt="AI icon"
                                                        className="w-4 h-4 ml-2 my-2"
                                                    />
                                                    <p className="px-2 my-2 pt-0.5">
                                                        Detect Obstructions
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[1px] h-[25px] bg-gray-300"></div>
                        <div className="flex flex-row w-1/4 justify-center items-center relative">
                            {/* {isOperationEditMode ? (
                                <div className="bg-primary rounded px-1 py-0.5 cursor-pointer">
                                    {isMoveAlignmentMode && (
                                        <img
                                            src="/tap-white.svg"
                                            alt="Tap icon"
                                            className="w-4 h-4"
                                        />
                                    )}
                                    {!isMoveAlignmentMode && (
                                        <img
                                            src="/curve-white.svg"
                                            alt="Curve icon"
                                            className="w-4 h-4"
                                        />
                                    )}
                                </div>
                            ) : ( */}
                            <img
                                // onClick={() => {
                                //     setAlignmentMode(
                                //         isMoveAlignmentMode
                                //             ? PolygonAlignmentMode.MOVE
                                //             : PolygonAlignmentMode.ADD_POINT
                                //     );
                                //     setMoveDropdownOpen(false);
                                // }}
                                // src={
                                //     isMoveAlignmentMode
                                //         ? '/tap.svg'
                                //         : '/curve.svg'
                                // }
                                src="/pencil.svg"
                                alt="Tap icon"
                                className="w-5 h-5 cursor-pointer"
                            />
                            {/* )} */}
                            <div>
                                <div
                                    id="dropdownBgHoverButton"
                                    data-dropdown-toggle="dropdownBgHover"
                                    className="p-1 cursor-pointer"
                                    onClick={toggleMoveDropdown}
                                >
                                    <FaChevronDown size={8} />
                                </div>
                                <div
                                    id="dropdownBgHover"
                                    className={`absolute top-7 left-0 ${isMoveDropdownOpen ? '' : 'hidden'} z-10 max-h-48 w-32 overflow-y-auto bg-white rounded border border-gray-300 mt-1`}
                                >
                                    <div className="relative flex flex-grow flex-col text-x">
                                        <div
                                            className={`flex flex-row cursor-pointer ${isOperationEditMode ? (isMoveAlignmentMode ? 'pointer-events-none opacity-60 bg-gray-200' : '') : ''}`}
                                            onClick={() => {
                                                setAlignmentMode(
                                                    PolygonAlignmentMode.MOVE
                                                );
                                                // toggleMoveDropdown();
                                            }}
                                        >
                                            <img
                                                src="/tap.svg"
                                                alt="Tap icon"
                                                className="w-4 h-4 ml-2 my-2"
                                            />
                                            <p className="px-2 my-2">
                                                Move point
                                            </p>
                                        </div>
                                        <hr />
                                        <div
                                            className={`flex flex-row cursor-pointer ${isOperationEditMode ? (isMoveAddPointMode ? 'pointer-events-none opacity-60 bg-gray-200' : '') : ''}`}
                                            onClick={() => {
                                                setAlignmentMode(
                                                    PolygonAlignmentMode.ADD_POINT
                                                );
                                                // toggleMoveDropdown();
                                            }}
                                        >
                                            <img
                                                src="/curve.svg"
                                                alt="Curve icon"
                                                className="w-4 h-4 ml-2 my-2"
                                            />
                                            <p className="px-2 my-2">
                                                Add point
                                            </p>
                                        </div>
                                        <hr />
                                        <div
                                            className={`flex flex-row cursor-pointer ${!isOperationEditMode ? (isOperationAddMode ? 'pointer-events-none opacity-60 bg-gray-200' : '') : ''}`}
                                            onClick={() => {
                                                setOperationMode(
                                                    PolygonOperationMode.ADD_POLYGON
                                                );
                                                // toggleAddRemoveDropdown();
                                            }}
                                        >
                                            <img
                                                src="/add.svg"
                                                alt="CurAddve icon"
                                                className="w-4 h-4 ml-2 my-2"
                                            />
                                            <p className="px-2 my-2 pt-0.5">
                                                Add{' '}
                                                {isParameterEditorMode
                                                    ? 'Surface Area'
                                                    : 'Obstructions'}
                                            </p>
                                        </div>
                                        <hr />
                                        <div
                                            className={`flex flex-row cursor-pointer ${!isOperationEditMode ? (isOperationRemoveMode ? 'pointer-events-none opacity-60 bg-gray-200' : '') : ''}`}
                                            onClick={() => {
                                                setOperationMode(
                                                    PolygonOperationMode.REMOVE_POLYGON
                                                );
                                                // toggleAddRemoveDropdown();
                                            }}
                                        >
                                            <img
                                                src="/remove.svg"
                                                alt="Remove icon"
                                                className="w-4 h-4 ml-2 my-2"
                                            />
                                            <p className="px-2 my-2 pt-0.5">
                                                Remove{' '}
                                                {isParameterEditorMode
                                                    ? 'Surface Area'
                                                    : 'Obstructions'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[1px] h-[25px] bg-gray-300"></div>
                        {
                            //#region old code for add/remove dropdown
                            /* 
                            <div className="flex flex-row w-1/4 justify-center items-center relative">
                                {!isOperationEditMode ? (
                                    <div className="bg-primary rounded px-1 py-0.5 cursor-pointer">
                                        {isOperationAddMode && (
                                            <img
                                                src="/add-white.svg"
                                                alt="Add icon"
                                                className="w-4 h-4"
                                            />
                                        )}
                                        {isOperationRemoveMode && (
                                            <img
                                                src="/remove-white.svg"
                                                alt="Remove icon"
                                                className="w-4 h-4"
                                            />
                                        )}
                                    </div>
                                ) : (
                                    <img
                                        onClick={() => {
                                            setOperationMode(
                                                isOperationRemoveMode
                                                    ? PolygonOperationMode.REMOVE_POLYGON
                                                    : PolygonOperationMode.ADD_POLYGON
                                            );
                                            setAddRemoveDropdownOpen(false);
                                        }}
                                        src={
                                            isOperationRemoveMode
                                                ? '/remove.svg'
                                                : '/add.svg'
                                        }
                                        alt="Tap icon"
                                        className="w-4 h-4 cursor-pointer"
                                    />
                                )}
                                <div>
                                    <div
                                        id="dropdownBgHoverButton"
                                        data-dropdown-toggle="dropdownBgHover"
                                        className="p-1 cursor-pointer"
                                        onClick={toggleAddRemoveDropdown}
                                    >
                                        <FaChevronDown size={8} />
                                    </div>
                                    <div
                                        id="dropdownBgHover"
                                        className={`absolute top-7 right-0 ${isAddRemoveDropdownOpen ? '' : 'hidden'} z-0 max-h-48 w-[166px] overflow-y-auto bg-white rounded border border-gray-300 mt-1`}
                                    >
                                        <div className="relative flex flex-grow flex-col text-x">
                                            <div
                                                className="flex flex-row cursor-pointer"
                                                onClick={() => {
                                                    setOperationMode(
                                                        PolygonOperationMode.ADD_POLYGON
                                                    );
                                                    toggleAddRemoveDropdown();
                                                }}
                                            >
                                                <img
                                                    src="/add.svg"
                                                    alt="CurAddve icon"
                                                    className="w-4 h-4 ml-2 my-2"
                                                />
                                                <p className="px-2 my-2 pt-0.5">
                                                    Add{' '}
                                                    {isParameterEditorMode
                                                        ? 'Surface Area'
                                                        : 'Obstructions'}
                                                </p>
                                            </div>
                                            <div
                                                className="flex flex-row cursor-pointer"
                                                onClick={() => {
                                                    setOperationMode(
                                                        PolygonOperationMode.REMOVE_POLYGON
                                                    );
                                                    toggleAddRemoveDropdown();
                                                }}
                                            >
                                                <img
                                                    src="/remove.svg"
                                                    alt="Remove icon"
                                                    className="w-4 h-4 ml-2 my-2"
                                                />
                                                <p className="px-2 my-2 pt-0.5">
                                                    Remove{' '}
                                                    {isParameterEditorMode
                                                        ? 'Surface Area'
                                                        : 'Obstructions'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                            */
                            //#endregion
                        }
                        <div className="w-[1px] h-[25px] bg-gray-300"></div>
                        <div className="flex w-1/4 justify-center items-center">
                            <div
                                className="flex w-1/4 justify-center items-center"
                                style={{ color: '#0e2b4e' }}
                                onClick={handleUndo}
                            >
                                <GrUndo className={`w-5 h-5 cursor-pointer ${actionsStack.length > 0 ? '' : 'opacity-50'}`} />
                            </div>
                        </div>
                        <div className="w-[1px] h-[25px] bg-gray-300"></div>
                        <div className="flex w-1/4 justify-center items-center">
                            <div
                                className="flex w-1/4 justify-center items-center"
                                style={{ color: '#0e2b4e' }}
                                onClick={resetMode}
                            >
                                <GrTrash className="w-5 h-5 cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default PropertyEditorActions;

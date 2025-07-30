import React, { useMemo } from 'react'
import usePropertyEditor from 'modules/protected/property-details/hooks/property-editor/usePropertyEditor';
import usePropertyFootprint from 'modules/protected/property-details/hooks/property-footprint/usePropertyFootprint';
import { PolygonAlignmentMode, PolygonOperationMode, PropertyEditorDetectionMode, PropertyEditorMode, PropertyMapMode } from 'modules/protected/property-details/state/property-editor/PropertyEditorDefaults';
import { GoDotFill } from 'react-icons/go';
import { GrTrash, GrUndo } from 'react-icons/gr';
import { FaChevronDown } from 'react-icons/fa';
import useSamEditorActions from './hooks/useSamEditorActions';
import usePropertyPolygon from '../../../property-map/hooks/usePropertyPolygon';
import usePropertyEditorActionsStack from 'modules/protected/property-details/hooks/property-editor/usePropertyEditorActionsStack';
import usePropertyEditorManager from 'modules/protected/property-details/hooks/property-editor-manager/usePropertyEditorManager';

type SAMEditorActionsProps = {
    onResetButtonClick: () => void
}

const SAMEditorActions = ({ onResetButtonClick }: SAMEditorActionsProps) => {
    const { propertyEditor, setOperationMode, setAlignmentMode, setDetectionMode, setEditorMode, handleUndo } = usePropertyEditor();
    const { footprint } = usePropertyFootprint();
    const { detectObstructionByImage } = usePropertyPolygon();
    const { actionsStack } = usePropertyEditorActionsStack();
    const { base64Image, boundingBox } = usePropertyEditorManager();

    const {
        isPolygonDetectionDropdownOpen,
        isPolygonPointDropdownOpen,
        isPolygonDropdownOpen,
        togglePolygonDropdown,
        togglePolygonPointDropdown,
        togglePolygonDetectionDropdown
    } = useSamEditorActions();

    const isEditorMode = useMemo(
        () => propertyEditor.propertyMapMode === PropertyMapMode.EDITOR,
        [propertyEditor]
    );

    const isParameterEditorMode = useMemo(
        () => propertyEditor.propertyEditorMode === PropertyEditorMode.SHAPE,
        [propertyEditor]
    );

    const isMoveAlignmentMode = useMemo(
        () => propertyEditor.polygonAlignmentMode === PolygonAlignmentMode.MOVE,
        [propertyEditor]
    );

    const isOperationAddMode = useMemo(
        () => propertyEditor.polygonOperationMode === PolygonOperationMode.ADD_POLYGON,
        [propertyEditor]
    );

    const isDetectionHoverMode = useMemo(
        () => propertyEditor.detectionMode === PropertyEditorDetectionMode.HOVER,
        [propertyEditor]
    );

    const isDetectionBoxMode = useMemo(
        () => propertyEditor.detectionMode === PropertyEditorDetectionMode.BOX,
        [propertyEditor]
    );

    const isAiDetectionMode = useMemo(
        () => propertyEditor.detectionMode === PropertyEditorDetectionMode.AI,
        [propertyEditor]
    );

    const hasFootprint = useMemo(
        () => footprint.shapes.length > 0,
        [footprint]
    );

    return (
        <>
            {
                isEditorMode && hasFootprint && (
                    <>
                        {/* {
							isParameterEditorMode && (
								<div className="flex flex-row bg-white rounded mt-2 text-sm border-white border justify-between">
									<div
										className={`flex flex-row w-[220px] items-center justify-center cursor-default select-none text-gray-700 py-1.5 rounded`}
										style={{ backgroundColor: "rgba(54, 234, 197, 0.8 )"}}
									>
										<GoDotFill className="text-green-800" />
										<p className="text-xs ml-0.5 px-0.5">Perimeter</p>
									</div>
								</div>
							)
						} */}
                        {/* {
							!isParameterEditorMode && (
								<div className="flex flex-row bg-white rounded mt-2 text-sm border-white border justify-between">
									<div
										className={`flex flex-row w-[220px] items-center justify-center cursor-default select-none text-red-700 py-1.5 rounded bg-red-300`}
									>
										<GoDotFill />
										<p className="text-xs ml-0.5 px-0.5">Obstructions</p>
									</div>
								</div>
							)
						} */}
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
                    </>
                )
            }
            <div className="flex flex-row bg-white py-1 w-[220px] rounded mt-2 justify-between">
                <div className="flex flex-row w-1/4 justify-center items-center relative">
                    <div className="rounded px-1 py-0.5 cursor-pointer">
                        {
                            // isDetectionHoverMode ? (
                            // 	<img
                            // 		src="/sam-hover-active.svg"
                            // 		alt="Tap icon"
                            // 		className="w-4 h-4"
                            // 	/>
                            // ) : (
                            // 	<img
                            // 		src="/sam-box-active.svg"
                            // 		alt="Tap icon"
                            // 		className="w-4 h-4"
                            // 	/>
                            // )
                            <img
                                src="/ai-icon.svg"
                                alt="Tap icon"
                                className="w-5 h-5"
                            />
                        }
                    </div>
                    <div>
                        <div
                            id="dropdownBgHoverButton"
                            data-dropdown-toggle="dropdownBgHover"
                            className="p-1 cursor-pointer"
                            onClick={togglePolygonDetectionDropdown}
                        >
                            <FaChevronDown size={8} />
                        </div>
                        <div
                            id="dropdownBgHover"
                            className={`absolute top-7 left-0 ${isPolygonDetectionDropdownOpen ? '' : 'hidden'} z-10 max-h-48 w-32 overflow-y-auto bg-white rounded border border-gray-300 mt-1`}
                        >
                            <div className="relative flex flex-grow flex-col text-x">
                                <div
                                    className={`flex flex-row cursor-pointer ${isDetectionHoverMode ? 'pointer-events-none opacity-60 bg-gray-200' : ''}`}
                                    onClick={() => {
                                        setDetectionMode(
                                            PropertyEditorDetectionMode.HOVER
                                        );
                                        togglePolygonDetectionDropdown();
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
                                    className={`flex flex-row cursor-pointer ${isDetectionBoxMode ? 'pointer-events-none opacity-60 bg-gray-200' : ''}`}
                                    onClick={() => {
                                        setDetectionMode(
                                            PropertyEditorDetectionMode.BOX
                                        );
                                        togglePolygonDetectionDropdown();
                                    }}
                                >
                                    <img
                                        src="/sam-box.svg"
                                        alt="Tap icon"
                                        className="w-4 h-4 ml-2 my-2"
                                    />
                                    <p className="px-2 my-2">
                                        Draw a box
                                    </p>
                                </div>
                                {!isParameterEditorMode && boundingBox !== undefined && (
                                    <>
                                        <hr />
                                        <div
                                            className={`flex flex-row cursor-pointer ${isAiDetectionMode ? 'pointer-events-none opacity-60 bg-gray-200' : ''}`}
                                            onClick={() => {
                                                detectObstructionByImage(base64Image.replace("data:image/png;base64,", ""), boundingBox!);
                                                togglePolygonDetectionDropdown();
                                                setDetectionMode(
                                                    PropertyEditorDetectionMode.AI
                                                );
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
                    <img
                        // onClick={() => {
                        //     setAlignmentMode(
                        //         isMoveAlignmentMode
                        //             ? PolygonAlignmentMode.ADD_POINT
                        //             : PolygonAlignmentMode.MOVE
                        //     );
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
                    <div>
                        <div
                            id="dropdownBgHoverButton"
                            data-dropdown-toggle="dropdownBgHover"
                            className="p-1 cursor-pointer"
                            onClick={togglePolygonPointDropdown}
                        >
                            <FaChevronDown size={8} />
                        </div>
                        <div
                            id="dropdownBgHover"
                            className={`absolute top-7 left-0 ${isPolygonPointDropdownOpen ? '' : 'hidden'} z-10 max-h-48 w-32 overflow-y-auto bg-white rounded border border-gray-300 mt-1`}
                        >
                            <div className="relative flex flex-grow flex-col text-x">
                                <div
                                    className="flex flex-row cursor-pointer"
                                    onClick={() => {
                                        setAlignmentMode(
                                            PolygonAlignmentMode.MOVE
                                        );
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
                                    className="flex flex-row cursor-pointer"
                                    onClick={() => {
                                        setAlignmentMode(
                                            PolygonAlignmentMode.ADD_POINT
                                        );
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
                                <div className="relative flex flex-grow flex-col text-x">
                                    <div
                                        className="flex flex-row cursor-pointer"
                                        onClick={() => {
                                            setOperationMode(
                                                PolygonOperationMode.ADD_POLYGON
                                            );
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
                                        className="flex flex-row cursor-pointer"
                                        onClick={() => {
                                            setOperationMode(
                                                PolygonOperationMode.REMOVE_POLYGON
                                            );
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
                </div>
                <div className="w-[1px] h-[25px] bg-gray-300"></div>
                {
                    //#region old add/remove polygon buttons
                    /* <div className="flex flex-row w-1/4 justify-center items-center relative">
                        <img
                            onClick={() => {
                                setOperationMode(
                                    isOperationAddMode
                                        ? PolygonOperationMode.ADD_POLYGON
                                        : PolygonOperationMode.REMOVE_POLYGON
                                );
                            }}
                            src={
                                isOperationAddMode
                                    ? '/add.svg'
                                    : '/remove.svg'
                            }
                            alt="Tap icon"
                            className="w-4 h-4 cursor-pointer"
                        />
                        <div>
                            <div
                                id="dropdownBgHoverButton"
                                data-dropdown-toggle="dropdownBgHover"
                                className="p-1 cursor-pointer"
                                onClick={togglePolygonDropdown}
                            >
                                <FaChevronDown size={8} />
                            </div>
                            <div
                                id="dropdownBgHover"
                                className={`absolute top-7 right-0 ${isPolygonDropdownOpen ? '' : 'hidden'} z-0 max-h-48 w-[166px] overflow-y-auto bg-white rounded border border-gray-300 mt-1`}
                            >
                                <div className="relative flex flex-grow flex-col text-x">
                                    <div
                                        className="flex flex-row cursor-pointer"
                                        onClick={() => {
                                            setOperationMode(
                                                PolygonOperationMode.ADD_POLYGON
                                            );
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
                    <div className="w-[1px] h-[25px] bg-gray-300"></div> */
                    //#endregion
                }
                <div className="flex flex-row w-1/4 justify-center items-center relative">
                    <div
                        className="flex w-1/4 justify-center items-center"
                        style={{ color: '#0e2b4e' }}
                        onClick={handleUndo}
                    >
                        <GrUndo className={`w-5 h-5 cursor-pointer ${actionsStack.length > 0 ? '' : 'opacity-50'}`} />
                    </div>
                </div>
                <div className="w-[1px] h-[25px] bg-gray-300"></div>
                <div className="flex flex-row w-1/4 justify-center items-center relative">
                    <div
                        className="flex w-1/4 justify-center items-center"
                        style={{ color: '#0e2b4e' }}
                        onClick={onResetButtonClick}
                    >
                        <GrTrash className="w-5 h-5 cursor-pointer" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SAMEditorActions
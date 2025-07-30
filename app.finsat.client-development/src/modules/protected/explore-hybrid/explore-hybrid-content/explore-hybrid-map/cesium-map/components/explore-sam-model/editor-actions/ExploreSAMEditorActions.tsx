import { useMemo } from 'react'
import { GrTrash } from 'react-icons/gr';
import { FaChevronDown } from 'react-icons/fa';
import useExploreSamEditorActions from './hooks/useExploreSamEditorActions';
import useExploreEditor from '@explore/explore-hybrid-content/explore-hybrid-map/hooks/explore-editor/useExploreEditor';
import { EditorDetectionMode } from '@explore/explore-hybrid-content/explore-hybrid-map/state/explore-editor/ExploreEditorDefaults';
import { RxExit } from "react-icons/rx";

type SAMEditorActionsProps = {
    onResetButtonClick: () => void;
    onCloseEditorClick: () => void;
}

const ExploreSAMEditorActions = ({
    onResetButtonClick,
    onCloseEditorClick
}: SAMEditorActionsProps) => {
    const { exploreEditor, setEditorDetectionMode } = useExploreEditor();

    const {
        isPolygonDetectionDropdownOpen,
        togglePolygonDetectionDropdown
    } = useExploreSamEditorActions();

    const isDetectionHoverMode = useMemo(
        () => exploreEditor.detectionMode === EditorDetectionMode.HOVER,
        [exploreEditor]
    );

    const isDetectionBoxMode = useMemo(
        () => exploreEditor.detectionMode === EditorDetectionMode.BOX,
        [exploreEditor]
    );

    return (
        <>
            <div className="flex flex-row bg-white py-1 w-[200px] rounded mt-2 justify-between">
                <div className="flex flex-row w-1/2 justify-center items-center relative">
                    <div className="rounded px-1 py-0.5 cursor-pointer">
                        {
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
                                        setEditorDetectionMode(
                                            EditorDetectionMode.HOVER
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
                                        setEditorDetectionMode(
                                            EditorDetectionMode.BOX
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
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[1px] h-[25px] bg-gray-300"></div>
                <div className="flex flex-row w-1/2 justify-center items-center relative">
                    <div
                        className="flex w-1/4 justify-center items-center"
                        style={{ color: '#0e2b4e' }}
                        onClick={onResetButtonClick}
                    >
                        <GrTrash className="w-5 h-5 cursor-pointer" />
                    </div>
                </div>
                <div className="w-[1px] h-[25px] bg-gray-300"></div>
                <div className="flex flex-row w-1/2 justify-center items-center relative">
                    <div
                        className="flex w-1/4 justify-center items-center"
                        style={{ color: '#0e2b4e' }}
                        onClick={onCloseEditorClick}
                    >
                        <RxExit className="w-5 h-5 cursor-pointer" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExploreSAMEditorActions
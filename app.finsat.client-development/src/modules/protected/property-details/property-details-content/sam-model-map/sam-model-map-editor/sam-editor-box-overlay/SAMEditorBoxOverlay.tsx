import React from 'react'

const SAMEditorBoxOverlay = ({ wrapperRef, imageRectangle, dragStart, dragCurrent, image }: any) => {
    if (!wrapperRef.current || !imageRectangle || !dragStart || !dragCurrent || !image) {
        return <></>;
    }

    const wrapperRectangle = wrapperRef.current.getBoundingClientRect();

    const offsetX = imageRectangle.left - wrapperRectangle.left;
    const offsetY = imageRectangle.top - wrapperRectangle.top;

    const scaleX = imageRectangle.width / image.width;
    const scaleY = imageRectangle.height / image.height;

    const startX = dragStart[0] * scaleX;
    const startY = dragStart[1] * scaleY;
    const currentX = dragCurrent[0] * scaleX;
    const currentY = dragCurrent[1] * scaleY;

    const boxLeft = Math.min(startX, currentX);
    const boxTop = Math.min(startY, currentY);
    const boxWidth = Math.abs(currentX - startX);
    const boxHeight = Math.abs(currentY - startY);

    return (
        <div
            style={{
                position: "absolute",
                left: `${offsetX + boxLeft}px`,
                top: `${offsetY + boxTop}px`,
                width: `${boxWidth}px`,
                height: `${boxHeight}px`,
                border: "2px solid #36ebc4",
                backgroundColor: "rgba(54, 235, 196, 0.2)",
                pointerEvents: "none",
                zIndex: 20, // Ensure it's above other elements
            }}>

        </div>
    )
}

export default SAMEditorBoxOverlay
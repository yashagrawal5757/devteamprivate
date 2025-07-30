import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type TooltipProps = {
    message: string;
    children: React.ReactNode;
};

const Tooltip = ({ message, children }: TooltipProps) => {
    const [visible, setVisible] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLSpanElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [positionReady, setPositionReady] = useState(false);


    const showTooltip = () => {
        if (hideTimeout.current) {
            clearTimeout(hideTimeout.current);
            hideTimeout.current = null;
        }

        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            const tooltipOffset = 70;
            setCoords({
                top: rect.top - tooltipOffset,
                left: rect.left + rect.width / 2,
            });
            setPositionReady(true);
            setVisible(true);
        }
    };


    const hideTooltip = () => {
        hideTimeout.current = setTimeout(() => {
            setVisible(false);
            setPositionReady(false);
        }, 150);
    };


    useEffect(() => {
        if (visible && triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            const tooltipOffset = 70;
            setCoords({
                top: rect.top - tooltipOffset,
                left: rect.left + rect.width / 2,
            });
        }
    }, [visible]);

    useEffect(() => {
        if (!visible || !tooltipRef.current) return;
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        let newTop = coords.top;
        let newLeft = coords.left;

        const padding = 8;

        if (tooltipRect.left < padding) {
            newLeft += padding - tooltipRect.left;
        }
        if (tooltipRect.right > window.innerWidth - padding) {
            newLeft -= (tooltipRect.right - (window.innerWidth - padding));
        }
        if (tooltipRect.top < padding) {
            newTop += padding - tooltipRect.top;
        }
        if (tooltipRect.bottom > window.innerHeight - padding) {
            newTop -= (tooltipRect.bottom - (window.innerHeight - padding));
        }

        if (newTop !== coords.top || newLeft !== coords.left) {
            setCoords({ top: newTop, left: newLeft });
        }

    }, [visible, coords]);

    return (
        <>
            <span
                ref={triggerRef}
                onMouseEnter={showTooltip}
                onMouseLeave={hideTooltip}
                className="cursor-pointer"
            >
                {children}
            </span>

            {visible && positionReady &&
                createPortal(
                    <div
                        ref={tooltipRef}
                        className="fixed z-50 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-md transform whitespace-normal max-w-lg line-clamp-3 pointer-events-none"
                        style={{ top: coords.top, left: coords.left }}
                    >
                        {message}
                    </div>
                    ,
                    document.body
                )
            }
        </>
    );
};

export default Tooltip;

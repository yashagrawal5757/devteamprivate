import React from 'react';
import './InfoModal.css';

type InfoModalProps = {
    isOpen: boolean;
    onClose: () => void;
    text: string;
};

const InfoModal = ({ isOpen, onClose, text }: InfoModalProps) => {
    if (!isOpen) {
        return <></>;
    }

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-30">
            <div className="info-modal bg-white rounded-lg py-8 px-14 mx-auto shadow-lg text-center">
                <p className="text-lg mb-6">{text}</p>
                <button
                    className="bg-primary hover:bg-blue-700 text-white py-2 px-12 rounded-lg mx-auto block"
                    onClick={onClose}
                >
                    OK
                </button>
            </div>
        </div>
    );
};

export default InfoModal;

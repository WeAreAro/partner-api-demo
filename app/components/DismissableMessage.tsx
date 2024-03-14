import React, {useState} from 'react';
import {AiOutlineClose} from 'react-icons/ai';

export const DEFAULT_MOCK_MESSAGE = "Mocked responses are always the same and won't reflect validation errors or missing request data.";

const DismissibleMessage = ({message = DEFAULT_MOCK_MESSAGE}) => {
    const [showMessage, setShowMessage] = useState(true);

    const handleClose = () => {
        setShowMessage(false);
    };

    return (
        <>
            {showMessage && (
                <div className="dm-message-container">
                    <div className="dm-message">{message}</div>
                    <AiOutlineClose className="dm-close-icon" onClick={handleClose}/>
                </div>
            )}
        </>
    );
};

export default DismissibleMessage;

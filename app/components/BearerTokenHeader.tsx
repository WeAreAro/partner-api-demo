import {useRef, useState} from "react";
import {FaLock, FaLockOpen} from "react-icons/fa";
import {useGeneralStageStore} from "@/app/state/general_stages";

const BearerTokenHeader = () => {
    const [isOpen, setIsOpen] = useState(false);

    const refTextArea = useRef(null);

    const savedJwtBearerToken = useGeneralStageStore((state) => state.jwtBearerToken);
    const setJwtBearerToken = useGeneralStageStore((state) => state.setJwtBearerToken);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
        if (isOpen) {
            // console.log('Closed');
        } else {
            setTimeout(() => {
                refTextArea?.current?.focus();
                refTextArea?.current?.setSelectionRange(refTextArea?.current?.value.length, refTextArea?.current?.value.length);
            }, 100);
        }
    };

    const getTokenIcon = () => {
        return savedJwtBearerToken && savedJwtBearerToken.length > 0 && savedJwtBearerToken.startsWith("ey") ? (
            <FaLock/>
        ) : (
            <FaLockOpen/>
        );
    }

    return (
        <div className={`bearer-token-header ${isOpen ? 'open' : ''}`}>
            <div className="bearer-token-header-tab" onClick={toggleOpen}>
                {!isOpen ? getTokenIcon() : 'Close'}
            </div>
            <div>
                {isOpen && (
                    <div className="bearer-token-header-open">
                        <textarea
                            ref={refTextArea}
                            style={{width: "100%"}}
                            placeholder={"Enter your JWT Bearer Token, starting 'ey'"}
                            value={savedJwtBearerToken}
                            onChange={e => setJwtBearerToken(e.target.value.trim())}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default BearerTokenHeader;
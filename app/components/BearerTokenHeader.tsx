import {useRef, useState} from "react";
import {FaLock, FaLockOpen} from "react-icons/fa";
import {useGeneralStageStore} from "@/app/state/general_stages";

const BearerTokenHeader = () => {
    const [isOpen, setIsOpen] = useState(false);

    const refBearerToken = useRef(null);

    const savedJwtBearerToken = useGeneralStageStore((state) => state.jwtBearerToken);
    const setJwtBearerToken = useGeneralStageStore((state) => state.setJwtBearerToken);

    const savedApiKey = useGeneralStageStore((state) => state.apiKey);
    const setApiKey = useGeneralStageStore((state) => state.setApiKey);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
        if (isOpen) {
            // console.log('Closed');
        } else {
            setTimeout(() => {
                refBearerToken?.current?.focus();
                refBearerToken?.current?.setSelectionRange(refBearerToken?.current?.value.length, refBearerToken?.current?.value.length);
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
                    <>
                        <div className="bearer-token-header-open">
                            <textarea
                                ref={refBearerToken}
                                style={{width: "100%", border: "1px solid lightgrey"}}
                                placeholder={"Enter your JWT Bearer Token (starting 'ey')"}
                                value={savedJwtBearerToken}
                                onChange={e => setJwtBearerToken(e.target.value.trim())}
                            />
                        </div>
                        <div className="api-key-header-open">
                            <textarea
                                style={{width: "100%", border: "1px solid lightgrey"}}
                                placeholder={"Enter your Consumer API Key"}
                                value={savedApiKey}
                                rows={1}
                                onChange={e => setApiKey(e.target.value.trim())}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default BearerTokenHeader;
'use client';

import BearerTokenHeader from "@/app/components/BearerTokenHeader";
import {hasBothTokenAndApiKeyDefined} from "@/app/utils/BearerUtils";
import {useEligibilityStageStore} from "@/app/state/eligibility_stages";
import EligibilityStageNav from "@/app/components/stages/eligibility/EligibilityStageNav";
import EligibilityProgressBar from "@/app/components/stages/eligibility/EligibilityProgressBar";
import Switch from "react-switch";
import {useGeneralStageStore} from "@/app/state/general_stages";
import {useState} from "react";

export const EligibilityStageForm = ({title, canGoBack, inputFields, submitFormData, goBackCount = 1}: any) => {

    const savedPanelType = useEligibilityStageStore((state) => state.panelType)
    const savedStage = useEligibilityStageStore((state) => state.currentStage);

    const enableValidation = useGeneralStageStore((state) => state.enableValidation);
    const setEnableValidation = useGeneralStageStore((state) => state.setEnableValidation);

    const [validationState, setValidationState] = useState(enableValidation);

    const handleValidationChange = (checked) => {
        setValidationState(checked);
        setEnableValidation(checked);
    }

    return (
        <div className="m-auto w-full max-w-xs">
            {!hasBothTokenAndApiKeyDefined() &&
                <BearerTokenHeader/>
            }

            <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
                  onSubmit={submitFormData}>

                <EligibilityProgressBar panelType={savedPanelType} currentStage={savedStage}/>

                <h2 className="text-center text-lg text-gray-900 font-bold">{title}</h2>
                <br></br>

                {inputFields}

                <EligibilityStageNav canGoBack={canGoBack} goBackCount={goBackCount}/>

            </form>

            <div style={{display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "20px"}}>
                <span style={{paddingRight: "10px"}}>Form validation:</span>
                <Switch
                    onChange={handleValidationChange}
                    checked={validationState}
                    height={20}
                    width={40}
                    onColor={"#3d0481"}
                />
            </div>

        </div>)
}
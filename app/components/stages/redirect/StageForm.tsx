'use client';

import {useRedirectStageStore} from "../../../state/redirect_stages";
import StageNav from "./StageNav";
import BearerTokenHeader from "@/app/components/BearerTokenHeader";
import {hasTokenDefinedInEnv} from "@/app/utils/BearerUtils";
import RedirectProgressBar from "@/app/components/stages/redirect/RedirectProgressBar";
import Switch from "react-switch";
import {useGeneralStageStore} from "@/app/state/general_stages";
import {useState} from "react";

export const StageForm = ({title, canGoBack, inputFields, submitFormData, goBackCount = 1}: any) => {

    const savedFormType = useRedirectStageStore((state) => state.formType)
    const savedStage = useRedirectStageStore((state) => state.currentStage);

    const enableValidation = useGeneralStageStore((state) => state.enableValidation);
    const setEnableValidation = useGeneralStageStore((state) => state.setEnableValidation);

    const [validationState, setValidationState] = useState(enableValidation);

    const handleValidationChange = (checked) => {
        setValidationState(checked);
        setEnableValidation(checked);
    }

    return (
        <div className="m-auto w-full max-w-xs">
            {!hasTokenDefinedInEnv() &&
                <BearerTokenHeader/>
            }

            <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
                  onSubmit={submitFormData}>

                <RedirectProgressBar formType={savedFormType} currentStage={savedStage}/>

                <h2 className="text-center text-lg text-gray-900 font-bold">{title}</h2>
                <br></br>

                {inputFields}

                <StageNav canGoBack={canGoBack} goBackCount={goBackCount}/>

                <div style={{display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "20px"}}>
                    <span style={{paddingRight: "10px"}}>Form validation:</span>
                    <Switch
                        onChange={handleValidationChange}
                        checked={validationState}
                        height={20}
                        width={40}
                        onColor={"#3A787B"}
                    />
                </div>

            </form>
        </div>)
}
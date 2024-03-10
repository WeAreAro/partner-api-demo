'use client';

import {useRedirectStageStore} from "../../../state/redirect_stages";
import ProgressBar from "../../ProgressBar";
import StageNav from "./StageNav";
import BearerTokenHeader from "@/app/components/BearerTokenHeader";
import {hasTokenDefinedInEnv} from "@/app/utils/BearerUtils";

export const StageForm = ({title, canGoBack, inputFields, submitFormData}: any) => {

    const savedFormType = useRedirectStageStore((state) => state.formType)
    const savedStage = useRedirectStageStore((state) => state.currentStage);

    return (
        <div className="m-auto w-full max-w-xs">
            {!hasTokenDefinedInEnv() &&
                <BearerTokenHeader/>
            }

            <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
                  onSubmit={submitFormData}>

                <ProgressBar formType={savedFormType} currentStage={savedStage}/>

                <h2 className="text-center text-lg text-gray-900 font-bold">{title}</h2>
                <br></br>

                {inputFields}

                <StageNav canGoBack={canGoBack}/>

            </form>
        </div>)
}
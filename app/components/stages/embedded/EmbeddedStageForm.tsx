'use client';

import BearerTokenHeader from "@/app/components/BearerTokenHeader";
import {hasTokenDefinedInEnv} from "@/app/utils/BearerUtils";
import {useEmbeddedStageStore} from "@/app/state/embedded_stages";
import EmbeddedStageNav from "@/app/components/stages/embedded/EmbeddedStageNav";
import EmbeddedProgressBar from "@/app/components/stages/embedded/EmbeddedProgressBar";

export const EmbeddedStageForm = ({title, canGoBack, inputFields, submitFormData, goBackCount = 1}: any) => {

    const savedPanelType = useEmbeddedStageStore((state) => state.panelType)
    const savedStage = useEmbeddedStageStore((state) => state.currentStage);

    return (
        <div className="m-auto w-full max-w-xs">
            {!hasTokenDefinedInEnv() &&
                <BearerTokenHeader/>
            }

            <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
                  onSubmit={submitFormData}>

                <EmbeddedProgressBar panelType={savedPanelType} currentStage={savedStage}/>

                <h2 className="text-center text-lg text-gray-900 font-bold">{title}</h2>
                <br></br>

                {inputFields}

                <EmbeddedStageNav canGoBack={canGoBack} goBackCount={goBackCount}/>

            </form>
        </div>)
}
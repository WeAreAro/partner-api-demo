'use client';

import { useStageStore } from "../state/stages";
import ProgressBar from "./ProgressBar";
import StageNav from "./StageNav";

export const StageForm = ({ title, canGoBack, inputFields, submitFormData }: any) => {

    const savedFormType = useStageStore((state) => state.formType)
    const savedStage = useStageStore((state) => state.currentStage);

    return (
        <div className="m-auto w-full max-w-xs">
            <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={submitFormData}>

                <ProgressBar formType={savedFormType} currentStage={savedStage} />

                <h2 className="text-center text-lg text-gray-900 font-bold">{title}</h2>
                <br></br>

                {inputFields}

                <StageNav canGoBack={canGoBack} />

            </form >
        </div >)
}
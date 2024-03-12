import {useEffect, useRef} from "react";
import {
    EmbeddedCardFormStage,
    EmbeddedLoanFormStage,
    EmbeddedSecuredFormStage,
    useEmbeddedStageStore
} from "@/app/state/embedded_stages";

const EmbeddedStageNav = ({canGoBack}: any) => {
    const savedStage = useEmbeddedStageStore((state) => state.currentStage);

    const previousStage = useEmbeddedStageStore((state) => state.previousStage);
    const setCurrentStage = useEmbeddedStageStore((state) => state.setCurrentStage)

    const backStage = (savedStage === EmbeddedCardFormStage.EmploymentStage
        || savedStage === EmbeddedLoanFormStage.EmploymentStage
        || savedStage === EmbeddedSecuredFormStage.EmploymentStage) ? previousStage : savedStage - 1
    //const backStage = savedStage - 1

    const continueRef = useRef(null);
    const backRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
            const isFormControlFocused = document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA';

            if (!isFormControlFocused) {
                if (event.key === 'ArrowRight') {
                    continueRef?.current?.click();
                } else if (event.key === 'ArrowLeft') {
                    backRef?.current?.click();
                }
            }
        };

        // Add event listener for keydown events
        window.addEventListener('keydown', handleKeyDown);

        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (<div className="flex justify-between">
        {(canGoBack) &&
            <input
                ref={backRef}
                className="bg-amber-700 hover:bg-lime-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
                value="Back"
                onClick={() => setCurrentStage(backStage)}
            />
        }
        <input
            ref={continueRef}
            className="bg-lime-600 hover:bg-lime-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
            value={"Continue"}
        />
    </div>)
}

export default EmbeddedStageNav
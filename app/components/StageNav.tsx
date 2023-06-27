import { UnsecuredLoanFormStage, useStageStore } from "../state/stages";

const StageNav = ({ canGoBack }: any) => {
    const savedStage = useStageStore((state) => state.currentStage);

    const previousStage = useStageStore((state) => state.previousStage);
    const setCurrentStage = useStageStore((state) => state.setCurrentStage)

    const backStage = savedStage === UnsecuredLoanFormStage.EmploymentStage ? previousStage : savedStage - 1

    return (<div>
        <br></br>
        <input
            className="bg-lime-600 hover:bg-lime-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
            value={"Continue"}
        />
        {(canGoBack) &&
            <input
                className="mx-8 bg-amber-700 hover:bg-lime-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
                value="Back"
                onClick={() => setCurrentStage(backStage)}
            />
        }
    </div>)
}

export default StageNav
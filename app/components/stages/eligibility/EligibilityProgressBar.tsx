import {ELIGIBILITY_TOTAL_STAGES} from "@/app/state/eligibility_stages";
import ProgressBar from "@ramonak/react-progress-bar";

const EligibilityProgressBar = ({currentStage, panelType}: any) => {

    const TOTAL_STAGES = ELIGIBILITY_TOTAL_STAGES(panelType);

    return (
        <div className="flex max-w-3xl flex-col rounded py-12 px-6 text-slate-200">

            <h2 className="m-auto text-gray-700">Progress</h2>
            <br></br>
            <ProgressBar completed={currentStage} maxCompleted={TOTAL_STAGES - 2} isLabelVisible={false}
                         bgColor={"#65A20C"}/>
            <small className="m-auto text-gray-600">{ELIGIBILITY_TOTAL_STAGES(panelType) - currentStage - 1} remaining
                steps to
                complete</small>
        </div>)
}

export default EligibilityProgressBar
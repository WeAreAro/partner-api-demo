import {
    REDIRECT_TOTAL_CARD_STAGES,
    REDIRECT_TOTAL_UNSECURED_STAGES,
    RedirectFormType
} from "@/app/state/redirect_stages";
import ProgressBar from "@ramonak/react-progress-bar";

const RedirectProgressBar = ({currentStage, formType}: any) => {

    const TOTAL_STAGES = formType === RedirectFormType.UNSECURED_LOAN ? REDIRECT_TOTAL_UNSECURED_STAGES : REDIRECT_TOTAL_CARD_STAGES

    return (
        <div className="flex max-w-3xl flex-col rounded py-12 px-6 text-slate-200">

            <h2 className="m-auto text-gray-700">Progress</h2>
            <br></br>
            <ProgressBar completed={currentStage} maxCompleted={TOTAL_STAGES - 1} isLabelVisible={false}
                         bgColor={"#65A20C"}/>
            <small className="m-auto text-gray-600">
                {formType === RedirectFormType.UNSECURED_LOAN ? (REDIRECT_TOTAL_UNSECURED_STAGES - currentStage) : (REDIRECT_TOTAL_CARD_STAGES - currentStage)} remaining
                steps to complete</small>
        </div>)
}

export default RedirectProgressBar
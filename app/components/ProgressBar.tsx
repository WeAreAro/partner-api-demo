import { FormType, TOTAL_CARD_STAGES, TOTAL_UNSECURED_STAGES } from "../state/stages"

const ProgressBar = ({ currentStage, formType }: any) => {

    const TOTAL_STAGES = formType === FormType.UNSECURED_LOAN ? TOTAL_UNSECURED_STAGES : TOTAL_CARD_STAGES

    const PROGRESS_BAR_CLASS_NAMES = [
        "mb-2 h-[15px] flex-1 rounded-xl bg-lime-950",
        "mb-2 h-[15px] flex-1 rounded-xl bg-lime-900",
        "mb-2 h-[15px] flex-1 rounded-xl bg-lime-800",
        "mb-2 h-[15px] flex-1 rounded-xl bg-lime-700",
        "mb-2 h-[15px] flex-1 rounded-xl bg-lime-600",
        "mb-2 h-[15px] flex-1 rounded-xl bg-lime-500",
        "mb-2 h-[15px] flex-1 rounded-xl bg-lime-400",
        "mb-2 h-[15px] flex-1 rounded-xl bg-lime-300",
        "mb-2 h-[15px] flex-1 rounded-xl bg-lime-200",
        "mb-2 h-[15px] flex-1 rounded-xl bg-lime-100",
        "mb-2 h-[15px] flex-1 rounded-xl bg-lime-50"
    ]

    const generateProgressElement = (stage) => {
        let progressStage = stage;

        if (stage >= PROGRESS_BAR_CLASS_NAMES.length) {
            progressStage = PROGRESS_BAR_CLASS_NAMES.length - 1;
        }

        const className = PROGRESS_BAR_CLASS_NAMES[stage]
        return (<span className={className} />)
    }

    const renderProgressBar = () => {
        const progressBar = [];

        for (let stage = currentStage; stage < TOTAL_STAGES; stage++) {
            progressBar.push(generateProgressElement(stage))
        }

        return progressBar
    }

    return (
        <div className="flex max-w-3xl flex-col rounded py-12 px-6 text-slate-200">

            <h2 className="m-auto text-gray-700">Progress</h2>
            <br></br>
            <div className="mb-2 flex gap-2">
                {...renderProgressBar()}
            </div>
            <small className="m-auto text-gray-600">
                {formType === FormType.UNSECURED_LOAN ? (TOTAL_UNSECURED_STAGES - currentStage) : (TOTAL_CARD_STAGES - currentStage)} remaining steps to complete</small>
        </div>)
}

export default ProgressBar
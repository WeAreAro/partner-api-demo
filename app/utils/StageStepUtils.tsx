import {MaritalStatus} from "@/app/state/enum/Common";
import {EligibilityAboutYouPayload} from "@/app/state/eligibility_stages";

export const requiresJointApplicant = (aboutYouPayload: EligibilityAboutYouPayload) => {

    const fromAboutYou = aboutYouPayload?.marital_status === MaritalStatus["Living Together"] ||
        aboutYouPayload?.marital_status === MaritalStatus.Married ||
        aboutYouPayload?.marital_status === MaritalStatus["Living with Partner - Civil Partnership"];

    return fromAboutYou ?? false;

}

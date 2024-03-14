import {MaritalStatus} from "@/app/state/enum/Common";
import {EmbeddedAboutYouPayload} from "@/app/state/embedded_stages";

export const requiresJointApplicant = (aboutYouPayload: EmbeddedAboutYouPayload) => {

    const fromAboutYou = aboutYouPayload?.marital_status === MaritalStatus["Living Together"] ||
        aboutYouPayload?.marital_status === MaritalStatus.Married ||
        aboutYouPayload?.marital_status === MaritalStatus["Living with Partner - Civil Partnership"];

    return fromAboutYou ?? false;
    
}

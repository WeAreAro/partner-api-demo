import {create} from "zustand";

export interface GeneralStageState {

    jwtBearerToken: string
    enableValidation: boolean

    setJwtBearerToken: (jwtBearerToken: string) => void
    setEnableValidation: (enableValidation: boolean) => void
}

export const useGeneralStageStore = create<GeneralStageState>()((set) => ({

    jwtBearerToken: "",
    enableValidation: true,

    setJwtBearerToken: (jwtBearerToken: string) => set((state) => ({jwtBearerToken})),
    setEnableValidation: (enableValidation: boolean) => set((state) => ({enableValidation})),
}))

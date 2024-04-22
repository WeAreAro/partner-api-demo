import {create} from "zustand";

export interface GeneralStageState {

    jwtBearerToken: string
    apiKey: string
    enableValidation: boolean

    setJwtBearerToken: (jwtBearerToken: string) => void
    setApiKey: (apiKey: string) => void
    setEnableValidation: (enableValidation: boolean) => void
}

export const useGeneralStageStore = create<GeneralStageState>()((set) => ({

    jwtBearerToken: "",
    apiKey: "",
    enableValidation: true,

    setJwtBearerToken: (jwtBearerToken: string) => set((state) => ({jwtBearerToken})),
    setApiKey: (apiKey: string) => set((state) => ({apiKey})),
    setEnableValidation: (enableValidation: boolean) => set((state) => ({enableValidation})),
}))

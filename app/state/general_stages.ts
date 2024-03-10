import {create} from "zustand";

export interface GeneralStageState {

    jwtBearerToken: string

    setJwtBearerToken: (jwtBearerToken: string) => void
}

export const useGeneralStageStore = create<GeneralStageState>()((set) => ({

    jwtBearerToken: "",

    setJwtBearerToken: (jwtBearerToken: string) => set((state) => ({jwtBearerToken})),
}))

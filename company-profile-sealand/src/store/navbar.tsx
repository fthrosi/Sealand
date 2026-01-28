import {create} from "zustand";

interface NavbarState { 
    navbarHeight: number;
    setNavbarHeight: (height: number) => void;
}

export const useNavbarStore = create<NavbarState>((set, get) => ({
    navbarHeight: 0,
    setNavbarHeight: (height: number) => set({ navbarHeight: height }),
}))
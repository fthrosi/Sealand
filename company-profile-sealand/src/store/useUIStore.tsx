import { create } from "zustand";
export type modalKey =
  | "logout"
  | "addTeam"
  | "editTeam"
  | "deleteTeam"
  | "addCareer"
  | "editCareer"
  | "deleteCareer"
  | "addPortfolio"
  | "editPortfolio"
  | "deletePortfolio"
  | "addDivision"
  | "editDivision"
  | "deleteDivision"
  | "addFlag"
  | "editFlag"
  | "deleteFlag"
  | "addPortfolio"
  | "editPortfolio"
  | "deletePortfolio"
  | "addTeam"
  | "editTeam"
  | "deleteTeam"
  | "addGallery"
  | "editGallery"
  | "deleteGallery"
  | "addLicense"
  | "editLicense"
  | "deleteLicense"
  | "addVesselType"
  | "editVesselType"
  | "deleteVesselType"
  | "addVessel"
  | "editVessel"
  | "deleteVessel"
  | "deleteApplied"
  | "addApplicant";
export type sidebarKey = "sidebarCustomer" | "sidebarStaf";
interface UIState {
  activeSidebar: sidebarKey | null;
  openSidebar: (key: sidebarKey) => void;
  closeSidebar: () => void;

  activeModal: modalKey | null;
  open: (key: modalKey) => void;
  close: () => void;

  scrollY: number;
  setScrollY: (y: number) => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeSidebar: null,
  openSidebar: (key: sidebarKey) => set(() => ({ activeSidebar: key })),
  closeSidebar: () => set(() => ({ activeSidebar: null })),

  activeModal: null,
  open: (key: modalKey) => set(() => ({ activeModal: key })),
  close: () => set(() => ({ activeModal: null })),

  scrollY: 0,
  setScrollY: (y: number) => set(() => ({ scrollY: y })),
}));

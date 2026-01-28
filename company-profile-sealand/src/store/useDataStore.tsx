import { CareerOutput } from "@/types/career.type";
import {create} from "zustand";
import { getCareers } from "@/api/career";
import { VesselTypeOutput } from "@/types/vesels";
import { getVesselTypes } from "@/api/vessel-type";
import { DivisionOutput,TeamOutput } from "@/types/team";
import { getDivisions } from "@/api/division";
import { FlagOutput } from "@/types/flag.types";
import { getFlags } from "@/api/flags";
import { getTeams } from "@/api/teams";


interface DataState{
  careers: CareerOutput[];
  setCareers:(careers: CareerOutput[])=>void;
  fetchCareers: (force?: boolean)=>Promise<void>;

  vesselTypes: VesselTypeOutput[];
  setVesselTypes:(vesselTypes: VesselTypeOutput[])=>void;
  fetchVesselTypes: (force?: boolean)=>Promise<void>;

  divisions: DivisionOutput[];
  setDivisions:(divisions: DivisionOutput[])=>void;
  fetchDivisions: (force?: boolean)=>Promise<void>;

  flags: FlagOutput[];
  setFlags:(flags: FlagOutput[])=>void;
  fetchFlags: (force?: boolean)=>Promise<void>;

  teams: TeamOutput[];
  setTeams:(teams: TeamOutput[])=>void;
  fetchTeams: (force?: boolean)=>Promise<void>;

  isLoading: {
    careers: boolean;
    vesselTypes: boolean;
    divisions: boolean;
    flags: boolean;
    teams: boolean;
  }
  isFetched: {
    careers: boolean;
    vesselTypes: boolean;
    divisions: boolean;
    flags: boolean;
    teams: boolean;
  }
}

export const useDataStore = create<DataState>((set,get)=>({
    careers: [],
    setCareers:(careers)=> set({careers}),
    fetchCareers: async (force = false) => {
    if (get().isFetched.careers && !force) return;
    set((state) => ({
      isLoading: { ...state.isLoading, careers: true },
    }));
        try {
        const res = await getCareers();
        set((state) => ({ 
            careers: res.data.data || [],
            isFetched: { ...state.isFetched, careers: true }
        }));
        }catch (error) {
        console.error("Error fetching careers:", error);
        } finally {
        set((state) => ({
            isLoading: { ...state.isLoading, careers: false },
        }));
        }
    },
    vesselTypes: [],
    setVesselTypes:(vesselTypes)=> set({vesselTypes}),
    fetchVesselTypes: async (force = false) => {
    if (get().isFetched.vesselTypes && !force) return;
    set((state) => ({
      isLoading: { ...state.isLoading, vesselTypes: true },
    }));
        try {
        const res = await getVesselTypes();
        set((state) => ({ 
            vesselTypes: res.data.data || [],
            isFetched: { ...state.isFetched, vesselTypes: true }
        }));
        }catch (error) {
        console.error("Error fetching vessel types:", error);
        } finally {
        set((state) => ({
            isLoading: { ...state.isLoading, vesselTypes: false },
        }));
        }
    },

    divisions: [],
    setDivisions:(divisions)=> set({divisions}),
    fetchDivisions: async (force = false) => {
    if (get().isFetched.divisions && !force) return;
    set((state) => ({
      isLoading: { ...state.isLoading, divisions: true },
    }));
      try {
        const res = await getDivisions();
        set((state) => ({ 
            divisions: res.data.data || [],
            isFetched: { ...state.isFetched, divisions: true }
        }));
      }catch (error) {
        console.error("Error fetching divisions:", error);
      } finally {
        set((state) => ({
            isLoading: { ...state.isLoading, divisions: false },
        }));
      }
    },

    flags: [],
    setFlags:(flags)=> set({flags}),
    fetchFlags: async (force = false) => {
    if (get().isFetched.flags && !force) return;
    set((state) => ({
      isLoading: { ...state.isLoading, flags: true },
    }));
      try {
        const res = await getFlags();
        set((state) => ({
            flags: res.data.data || [],
            isFetched: { ...state.isFetched, flags: true }
        }));
      }catch (error) {
        console.error("Error fetching flags:", error);
      } finally {
        set((state) => ({
            isLoading: { ...state.isLoading, flags: false },
        }));
      }
    },

    teams: [],
    setTeams:(teams)=> set({teams}),
    fetchTeams: async (force = false) => {
    if (get().isFetched.teams && !force) return;
    set((state) => ({
      isLoading: { ...state.isLoading, teams: true },
    }));
      try {
        // Assuming there's an API function getTeams similar to others
        const res = await getTeams();
        set((state) => ({
            teams: res.data.data || [],
            isFetched: { ...state.isFetched, teams: true }
        }));
      }catch (error) {
        console.error("Error fetching teams:", error);
      } finally {
        set((state) => ({
            isLoading: { ...state.isLoading, teams: false },
        }));
      }
    },






  isLoading: {
    careers: false,
    vesselTypes: false,
    divisions: false,
    flags: false,
    teams: false,
  },

  // ========== FETCHED FLAGS ==========
  isFetched: {
    careers: false,
    vesselTypes: false,
    divisions: false,
    flags: false,
    teams: false,
  },
}));
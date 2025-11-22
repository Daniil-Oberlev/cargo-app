import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface CargoFormData {
  shipper: string;
  customer: string;
  receiver: string;
  deliveryAddress: string;
  cargoName: string;
  cargoVolume: string;
  cargoUnit: string;
  route: string;
  carrier: string;
  carrierName: string;
  vehicleBrand: string;
  vehicleNumber: string;
  loadingAddress: string;
  acceptanceDate: string;
  unloadingAddress: string;
  unloadingDate: string;
  receiverName: string;
  driverName: string;
  carrierDetails: string;
  payerDetails: string;
  directorName: string;
}

export interface AutocompleteData {
  shippers: string[];
  customers: string[];
  receivers: string[];
  cargoNames: string[];
  routes: string[];
  carriers: string[];
  carrierNames: string[];
  loadingAddresses: string[];
  receiverNames: string[];
  driverNames: string[];
  carrierDetails: string[];
  payerDetails: string[];
  directorNames: string[];
}

export interface AppSettings {
  showCloneWarning: boolean;
}

interface AppStore {
  formData: CargoFormData | null;
  autocomplete: AutocompleteData;
  settings: AppSettings;

  setFormData: (data: CargoFormData | null) => void;
  clearFormData: () => void;
  addAutocompleteItem: (field: keyof AutocompleteData, value: string) => void;
  removeAutocompleteItem: (
    field: keyof AutocompleteData,
    value: string,
  ) => void;
  updateSettings: (updates: Partial<AppSettings>) => void;
}

const initialAutocomplete: AutocompleteData = {
  shippers: [],
  customers: [],
  receivers: [],
  cargoNames: [],
  routes: [],
  carriers: [],
  carrierNames: [],
  loadingAddresses: [],
  receiverNames: [],
  driverNames: [],
  carrierDetails: [],
  payerDetails: [],
  directorNames: [],
};

const initialSettings: AppSettings = {
  showCloneWarning: true,
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      formData: null,
      autocomplete: initialAutocomplete,
      settings: initialSettings,

      setFormData: (data) => set({ formData: data }),
      clearFormData: () => set({ formData: null }),

      addAutocompleteItem: (field, value) =>
        set((state) => {
          if (!value.trim() || state.autocomplete[field].includes(value)) {
            return state;
          }
          return {
            autocomplete: {
              ...state.autocomplete,
              [field]: [...state.autocomplete[field], value].sort(),
            },
          };
        }),

      removeAutocompleteItem: (field, value) =>
        set((state) => ({
          autocomplete: {
            ...state.autocomplete,
            [field]: state.autocomplete[field].filter((item) => item !== value),
          },
        })),

      updateSettings: (updates) =>
        set((state) => ({
          settings: { ...state.settings, ...updates },
        })),
    }),
    {
      name: 'cargo-app-storage-v2',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);

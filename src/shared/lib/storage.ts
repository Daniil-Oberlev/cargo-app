import type {
  AppSettings,
  AutocompleteData,
  CargoFormData,
} from '@/shared/store/useAppStore';

import { useAppStore } from '@/shared/store/useAppStore';

export const saveFormData = (data: CargoFormData): void => {
  useAppStore.getState().setFormData(data);
};

export const getFormData = (): CargoFormData | null => {
  return useAppStore.getState().formData;
};

export const clearFormData = (): void => {
  useAppStore.getState().clearFormData();
};

export const getAutocompleteData = (): AutocompleteData => {
  return useAppStore.getState().autocomplete;
};

export const addAutocompleteItem = (
  field: keyof AutocompleteData,
  value: string,
): void => {
  useAppStore.getState().addAutocompleteItem(field, value);
};

export const removeAutocompleteItem = (
  field: keyof AutocompleteData,
  value: string,
): void => {
  useAppStore.getState().removeAutocompleteItem(field, value);
};

export const getAppSettings = (): AppSettings => {
  return useAppStore.getState().settings;
};

export const saveAppSettings = (settings: Partial<AppSettings>): void => {
  useAppStore.getState().updateSettings(settings);
};

export type { CargoFormData, AutocompleteData, AppSettings };

'use client';

import type { AutocompleteData } from '@/shared/lib/storage';

import { X } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import {
  addAutocompleteItem,
  removeAutocompleteItem,
} from '@/shared/lib/storage';
import { useAppStore } from '@/shared/store/useAppStore';

const fieldLabels: Record<keyof AutocompleteData, string> = {
  shippers: 'Грузоотправители',
  customers: 'Заказчики услуг',
  receivers: 'Грузополучатели',
  cargoNames: 'Названия грузов',
  routes: 'Маршруты перевозки',
  carriers: 'Перевозчики',
  carrierNames: 'ФИО перевозчиков',
  loadingAddresses: 'Адреса погрузки',
  receiverNames: 'ФИО грузополучателей',
  driverNames: 'ФИО водителей',
  carrierDetails: 'Реквизиты перевозчиков',
  payerDetails: 'Реквизиты плательщиков',
  directorNames: 'ФИО директоров',
};

export function DatabasePanel() {
  const autocompleteData = useAppStore((state) => state.autocomplete);

  const [newValues, setNewValues] = useState<
    Partial<Record<keyof AutocompleteData, string>>
  >({});

  const handleAdd = (field: keyof AutocompleteData) => {
    const value = newValues[field]?.trim();
    if (value && !autocompleteData[field].includes(value)) {
      addAutocompleteItem(field, value);
      setNewValues((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleRemove = (field: keyof AutocompleteData, value: string) => {
    removeAutocompleteItem(field, value);
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: keyof AutocompleteData,
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd(field);
    }
  };

  return (
    <div className='space-y-6'>
      <div className='mb-4'>
        <h2 className='text-foreground text-2xl font-semibold'>
          Настройки автокомплита
        </h2>
        <p className='text-muted-foreground mt-1 text-sm'>
          Добавьте варианты для автоматического заполнения полей формы
        </p>
      </div>

      {Object.entries(fieldLabels).map(([field, label]) => {
        const fieldKey = field as keyof AutocompleteData;

        return (
          <div key={fieldKey} className='space-y-3'>
            <Label className='text-base font-medium'>{label}</Label>

            <div className='flex gap-2'>
              <Input
                className='flex-1'
                placeholder='Введите значение и нажмите Enter или Добавить'
                value={newValues[fieldKey] ?? ''}
                onChange={(e) =>
                  setNewValues((prev) => ({
                    ...prev,
                    [fieldKey]: e.target.value,
                  }))
                }
                onKeyDown={(e) => handleKeyPress(e, fieldKey)}
              />
              <Button
                className='shrink-0'
                variant='outline'
                onClick={() => handleAdd(fieldKey)}
              >
                Добавить
              </Button>
            </div>

            {autocompleteData[fieldKey].length > 0 && (
              <div className='flex flex-wrap gap-2'>
                {autocompleteData[fieldKey].map((item) => (
                  <div
                    key={item}
                    className='border-border bg-muted flex items-center gap-1 rounded-md border px-3 py-1 text-sm'
                  >
                    <span className='text-foreground'>{item}</span>
                    <button
                      aria-label='Удалить'
                      className='text-muted-foreground hover:text-foreground ml-1'
                      onClick={() => handleRemove(fieldKey, item)}
                    >
                      <X className='h-3 w-3' />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

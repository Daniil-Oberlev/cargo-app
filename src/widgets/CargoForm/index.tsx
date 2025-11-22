'use client';

import type { CargoFormData } from '@/shared/lib/storage';

import { useState } from 'react';

import { AutocompleteInput } from '@/shared/components/ui/autocomplete/input';
import { AutocompleteTextarea } from '@/shared/components/ui/autocomplete/textarea';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Textarea } from '@/shared/components/ui/textarea';
import { useAppStore } from '@/shared/store/useAppStore';

interface CargoFormProps {
  onDataChange: (data: CargoFormData) => void;
  initialData?: CargoFormData | null;
}

export const CargoForm = ({ onDataChange, initialData }: CargoFormProps) => {
  const autocompleteData = useAppStore((state) => state.autocomplete);

  const [formData, setFormData] = useState<CargoFormData>(() => {
    if (initialData) return initialData;
    const saved = useAppStore.getState().formData;
    return (
      saved ?? {
        shipper: '',
        customer: '',
        receiver: '',
        deliveryAddress: '',
        cargoName: '',
        cargoVolume: '',
        cargoUnit: 'м³',
        route: '',
        carrier: '',
        carrierName: '',
        vehicleBrand: '',
        vehicleNumber: '',
        loadingAddress: '',
        acceptanceDate: '',
        unloadingAddress: '',
        unloadingDate: '',
        receiverName: '',
        driverName: '',
        carrierDetails: '',
        payerDetails: '',
        directorName: '',
      }
    );
  });

  const updateField = (field: keyof CargoFormData, value: string) => {
    const newData: CargoFormData = { ...formData, [field]: value };

    if (field === 'acceptanceDate' && value && !formData.unloadingDate) {
      newData.unloadingDate = value;
    }

    setFormData(newData);
    onDataChange(newData);
  };

  return (
    <div className='space-y-6'>
      <div className='border-border space-y-4 border-b pb-6'>
        <div>
          <Label htmlFor='shipper'>1. Реквизиты грузоотправителя</Label>
          <AutocompleteTextarea
            className='mt-2 min-h-20'
            id='shipper'
            placeholder='Введите реквизиты грузоотправителя'
            suggestions={autocompleteData.shippers}
            value={formData.shipper}
            onChange={(value) => updateField('shipper', value)}
          />
        </div>
        <div>
          <Label htmlFor='customer'>
            1a. Реквизиты заказчика услуг по организации перевозки груза
          </Label>
          <AutocompleteTextarea
            className='mt-2 min-h-20'
            id='customer'
            placeholder='Введите реквизиты заказчика'
            suggestions={autocompleteData.customers}
            value={formData.customer}
            onChange={(value) => updateField('customer', value)}
          />
        </div>
      </div>

      <div className='border-border space-y-4 border-b pb-6'>
        <div>
          <Label htmlFor='receiver'>2. Реквизиты грузополучателя</Label>
          <AutocompleteTextarea
            className='mt-2 min-h-20'
            id='receiver'
            placeholder='Введите реквизиты грузополучателя'
            suggestions={autocompleteData.receivers}
            value={formData.receiver}
            onChange={(value) => updateField('receiver', value)}
          />
        </div>
        <div>
          <Label htmlFor='deliveryAddress'>
            2a. Адрес места доставки груза
          </Label>
          <Textarea
            className='mt-2 min-h-[60px]'
            id='deliveryAddress'
            placeholder='Введите адрес доставки'
            value={formData.deliveryAddress}
            onChange={(e) => updateField('deliveryAddress', e.target.value)}
          />
        </div>
      </div>

      <div className='border-border space-y-4 border-b pb-6'>
        <div>
          <Label htmlFor='cargoName'>3. Название груза</Label>
          <AutocompleteInput
            className='mt-2'
            id='cargoName'
            placeholder='Введите название груза'
            suggestions={autocompleteData.cargoNames}
            value={formData.cargoName}
            onChange={(value) => updateField('cargoName', value)}
          />
        </div>
        <div>
          <Label>3a. Объём груза</Label>
          <div className='mt-2 flex gap-2'>
            <Input
              className='flex-1'
              placeholder='Количество'
              type='number'
              value={formData.cargoVolume}
              onChange={(e) => updateField('cargoVolume', e.target.value)}
            />
            <Select
              value={formData.cargoUnit}
              onValueChange={(value) => updateField('cargoUnit', value)}
            >
              <SelectTrigger className='w-[140px]'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='м³'>м³</SelectItem>
                <SelectItem value='т'>т</SelectItem>
                <SelectItem value='шт'>шт</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className='border-border space-y-4 border-b pb-6'>
        <div>
          <Label htmlFor='route'>5. Маршрут перевозки</Label>
          <AutocompleteTextarea
            className='mt-2 min-h-20'
            id='route'
            placeholder='Введите маршрут перевозки'
            suggestions={autocompleteData.routes}
            value={formData.route}
            onChange={(value) => updateField('route', value)}
          />
        </div>
      </div>

      <div className='border-border space-y-4 border-b pb-6'>
        <div>
          <Label htmlFor='carrier'>6. Перевозчик</Label>
          <AutocompleteTextarea
            className='mt-2 min-h-20'
            id='carrier'
            placeholder='Введите данные перевозчика'
            suggestions={autocompleteData.carriers}
            value={formData.carrier}
            onChange={(value) => updateField('carrier', value)}
          />
        </div>
        <div>
          <Label htmlFor='carrierName'>6a. ФИО перевозчика</Label>
          <AutocompleteInput
            className='mt-2'
            id='carrierName'
            placeholder='Введите ФИО перевозчика'
            suggestions={autocompleteData.carrierNames}
            value={formData.carrierName}
            onChange={(value) => updateField('carrierName', value)}
          />
        </div>
      </div>

      <div className='border-border space-y-4 border-b pb-6'>
        <div>
          <Label htmlFor='vehicleBrand'>7. Марка транспортного средства</Label>
          <Input
            className='mt-2'
            id='vehicleBrand'
            placeholder='Введите марку ТС'
            value={formData.vehicleBrand}
            onChange={(e) => updateField('vehicleBrand', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor='vehicleNumber'>
            7a. Номер транспортного средства
          </Label>
          <Input
            className='mt-2'
            id='vehicleNumber'
            placeholder='Введите номер ТС'
            value={formData.vehicleNumber}
            onChange={(e) => updateField('vehicleNumber', e.target.value)}
          />
        </div>
      </div>

      <div className='border-border space-y-4 border-b pb-6'>
        <div>
          <Label htmlFor='loadingAddress'>8. Адрес места погрузки</Label>
          <AutocompleteInput
            className='mt-2'
            id='loadingAddress'
            placeholder='Введите адрес погрузки'
            suggestions={autocompleteData.loadingAddresses}
            value={formData.loadingAddress}
            onChange={(value) => updateField('loadingAddress', value)}
          />
        </div>
        <div>
          <Label htmlFor='acceptanceDate'>8a. Дата приёма</Label>
          <Input
            className='mt-2'
            id='acceptanceDate'
            type='date'
            value={formData.acceptanceDate}
            onChange={(e) => updateField('acceptanceDate', e.target.value)}
          />
        </div>
      </div>

      <div className='border-border space-y-4 border-b pb-6'>
        <div>
          <Label htmlFor='unloadingAddress'>10. Адрес места выгрузки</Label>
          <Input
            className='mt-2'
            id='unloadingAddress'
            placeholder='Введите адрес выгрузки'
            value={formData.unloadingAddress}
            onChange={(e) => updateField('unloadingAddress', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor='unloadingDate'>10a. Дата выгрузки</Label>
          <Input
            className='mt-2'
            id='unloadingDate'
            type='date'
            value={formData.unloadingDate}
            onChange={(e) => updateField('unloadingDate', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor='receiverName'>10b. ФИО грузополучателя</Label>
          <AutocompleteInput
            className='mt-2'
            id='receiverName'
            placeholder='Введите ФИО грузополучателя'
            suggestions={autocompleteData.receiverNames}
            value={formData.receiverName}
            onChange={(value) => updateField('receiverName', value)}
          />
        </div>
        <div>
          <Label htmlFor='driverName'>10c. ФИО водителя</Label>
          <AutocompleteInput
            className='mt-2'
            id='driverName'
            placeholder='Введите ФИО водителя'
            suggestions={autocompleteData.driverNames}
            value={formData.driverName}
            onChange={(value) => updateField('driverName', value)}
          />
        </div>
      </div>

      <div className='space-y-4'>
        <div>
          <Label htmlFor='carrierDetails'>12. Реквизиты перевозчика</Label>
          <AutocompleteTextarea
            className='mt-2 min-h-20'
            id='carrierDetails'
            placeholder='Введите реквизиты перевозчика'
            suggestions={autocompleteData.carrierDetails}
            value={formData.carrierDetails}
            onChange={(value) => updateField('carrierDetails', value)}
          />
        </div>
        <div>
          <Label htmlFor='payerDetails'>12a. Реквизиты плательщика</Label>
          <AutocompleteTextarea
            className='mt-2 min-h-20'
            id='payerDetails'
            placeholder='Введите реквизиты плательщика'
            suggestions={autocompleteData.payerDetails}
            value={formData.payerDetails}
            onChange={(value) => updateField('payerDetails', value)}
          />
        </div>
        <div>
          <Label htmlFor='directorName'>12b. ФИО директора</Label>
          <AutocompleteInput
            className='mt-2'
            id='directorName'
            placeholder='Введите ФИО директора'
            suggestions={autocompleteData.directorNames}
            value={formData.directorName}
            onChange={(value) => updateField('directorName', value)}
          />
        </div>
      </div>
    </div>
  );
};

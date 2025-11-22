import type { CargoFormData } from '@/shared/lib/storage';

import { useState } from 'react';

import { Button } from '@/shared/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/tabs';
import { clearFormData, saveFormData } from '@/shared/lib/storage';
import { useAppStore } from '@/shared/store/useAppStore';
import {
  CargoForm,
  CloneConfirmationDialog,
  DatabasePanel,
  SettingsPanel,
} from '@/widgets/';

export const BLPage = () => {
  const { formData, settings } = useAppStore();
  const [clonedData, setClonedData] = useState<CargoFormData | null>(null);
  const [showCloneDialog, setShowCloneDialog] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const isFormComplete = (): boolean => {
    if (!formData) return false;

    const requiredFields: (keyof CargoFormData)[] = [
      'shipper',
      'customer',
      'receiver',
      'deliveryAddress',
      'cargoName',
      'cargoVolume',
      'cargoUnit',
      'route',
      'carrier',
      'carrierName',
      'vehicleBrand',
      'vehicleNumber',
      'loadingAddress',
      'acceptanceDate',
      'unloadingAddress',
      'unloadingDate',
      'receiverName',
      'driverName',
      'carrierDetails',
      'payerDetails',
      'directorName',
    ];

    return requiredFields.every((field) => formData[field].trim() !== '');
  };

  const handleSubmit = () => {
    if (!formData) return;

    // eslint-disable-next-line no-console
    console.log('=== ОТПРАВКА ФОРМЫ ===');
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(formData, null, 2));
    // eslint-disable-next-line no-console
    console.log('======================');

    clearFormData();
    setFormKey((prev) => prev + 1);
  };

  const handleClone = () => {
    if (settings.showCloneWarning) {
      setShowCloneDialog(true);
    } else {
      confirmClone();
    }
  };

  const confirmClone = () => {
    if (formData) {
      // eslint-disable-next-line no-console
      console.log('=== КЛОНИРОВАНИЕ ===');
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(formData, null, 2));

      setClonedData({ ...formData });
      clearFormData();
      setFormKey((prev) => prev + 1);
    }
    setShowCloneDialog(false);
  };

  return (
    <div className='mx-auto max-w-6xl'>
      <h1 className='text-foreground mb-6 text-3xl font-bold'>
        Система формирования документов
      </h1>

      <Tabs defaultValue='form'>
        <TabsList className='grid w-full max-w-2xl grid-cols-3'>
          <TabsTrigger value='form'>Форма</TabsTrigger>
          <TabsTrigger value='database'>База данных</TabsTrigger>
          <TabsTrigger value='settings'>Настройки</TabsTrigger>
        </TabsList>

        <TabsContent value='form'>
          <div className='border-border bg-card rounded-lg border p-6'>
            <CargoForm
              key={formKey}
              initialData={clonedData ?? undefined}
              onDataChange={(data) => saveFormData(data)}
            />
          </div>

          <div className='border-border mt-6 flex justify-end gap-3 border-t pt-6'>
            <Button
              disabled={!isFormComplete()}
              variant='outline'
              onClick={handleClone}
            >
              Клонировать
            </Button>
            <Button disabled={!isFormComplete()} onClick={handleSubmit}>
              Отправить
            </Button>
          </div>
        </TabsContent>

        <TabsContent value='database'>
          <div className='border-border bg-card rounded-lg border p-6'>
            <DatabasePanel />
          </div>
        </TabsContent>

        <TabsContent value='settings'>
          <div className='border-border bg-card rounded-lg border p-6'>
            <SettingsPanel />
          </div>
        </TabsContent>
      </Tabs>

      <CloneConfirmationDialog
        open={showCloneDialog}
        onConfirm={confirmClone}
        onOpenChange={setShowCloneDialog}
      />
    </div>
  );
};

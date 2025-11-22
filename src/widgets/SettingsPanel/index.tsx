import type { AppSettings } from '@/shared/lib/storage';

import { useState } from 'react';

import { Label } from '@/shared/components/ui/label';
import { Switch } from '@/shared/components/ui/switch';
import { getAppSettings, saveAppSettings } from '@/shared/lib/storage';

export const SettingsPanel = () => {
  const [settings, setSettings] = useState<AppSettings>(getAppSettings());

  const updateSetting = (key: keyof AppSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    saveAppSettings(newSettings);
  };

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-foreground text-2xl font-bold'>
          Настройки приложения
        </h2>
        <p className='text-muted-foreground mt-1 text-sm'>
          Управление настройками приложения
        </p>
      </div>

      <div className='border-border space-y-4 border-t pt-6'>
        <div className='flex items-center justify-between'>
          <div className='space-y-0.5'>
            <Label htmlFor='show-clone-warning'>
              Показывать предупреждение при клонировании
            </Label>
            <p className='text-muted-foreground text-sm'>
              Отображать модальное окно подтверждения при нажатии на кнопку
              &ldquo;Клонировать&rdquo;
            </p>
          </div>
          <Switch
            checked={settings.showCloneWarning}
            id='show-clone-warning'
            onCheckedChange={(checked) =>
              updateSetting('showCloneWarning', checked)
            }
          />
        </div>
      </div>
    </div>
  );
};

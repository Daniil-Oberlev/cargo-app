import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';

interface CloneConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function CloneConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
}: CloneConfirmationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Подтверждение отправки</DialogTitle>
          <DialogDescription>
            Предыдущая запись будет отправлена, и форма будет клонирована с
            текущими данными. Продолжить?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex-row justify-end gap-2 sm:justify-end'>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button onClick={onConfirm}>Отправить и клонировать</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import type { VariantProps } from 'class-variance-authority';

import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

import { cn } from '@/shared/lib/utils';
import { buttonVariants } from './variants';

export const Button = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ className, size, variant }))}
      {...props}
    />
  );
};

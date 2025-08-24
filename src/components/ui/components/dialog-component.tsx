import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DialogComponentProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
  footer: React.ReactNode;
  closeButton: React.ReactNode;
}

export function DialogComponent({
  trigger,
  title,
  description,
  children,
  footer,
  closeButton,
}: DialogComponentProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          {closeButton && <DialogClose asChild>{closeButton}</DialogClose>}
          {footer && footer}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

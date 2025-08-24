import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface DrawerComponentProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}

export function DrawerComponent({
  trigger,
  title,
  description,
  children,
}: DrawerComponentProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="mx-auto w-full items-center justify-center">
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <div className="flex min-w-6xl flex-col gap-4 space-y-4 overflow-y-auto px-4 pb-4 text-center">
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

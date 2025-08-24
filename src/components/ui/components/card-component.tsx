import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardComponentProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export function CardComponent({
  title,
  description,
  children,
}: CardComponentProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        {title && (
          <CardTitle className="flex flex-row items-center justify-center gap-2 text-center text-lg font-bold">
            {title}
          </CardTitle>
        )}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

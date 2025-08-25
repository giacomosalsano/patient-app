import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip";

interface TooltipComponentProps {
  content: string;
  children: React.ReactNode;
}

export function TooltipComponent({ content, children }: TooltipComponentProps) {
  return (
    <Tooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent>
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  );
}

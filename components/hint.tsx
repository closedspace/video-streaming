import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type HintProps = {
  label: string;
  children: React.ReactNode;
  side?: "bottom" | "top" | "left" | "right";
  align?: "start" | "center" | "end";
  asChild?: boolean;
};
export const Hint = ({ label, children, asChild, align, side }: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent
          className="text-black bg-white"
          side={side}
          align={align}
        >
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

"use client";

import { updateStream } from "@/actions/stream";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useTransition } from "react";
import { toast } from "sonner";

type Field = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";

type ToggleCardProps = {
  field: Field;
  label: string;
  value: boolean;
};

export const ToggleCard = ({
  field,
  value = false,
  label,
}: ToggleCardProps) => {
  const [isPending, startTransition] = useTransition();

  const onChange = () => {
    startTransition(() => {
      updateStream({ [field]: !value })
        .then((res) => {
          toast.success("Chat settings updated");
        })
        .catch((err) => {
          toast.error("Failed to update chat settings");
        });
    });
  };

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">{label}</p>
        <div className="space-y-2">
          <Switch
            disabled={isPending}
            checked={value}
            onCheckedChange={onChange}
          >
            {value ? "On" : "Off"}
          </Switch>
        </div>
      </div>
    </div>
  );
};

export const ToggleCardSkeleton = () => {
  return <Skeleton className="rounded-xl p-10 w-full" />;
};

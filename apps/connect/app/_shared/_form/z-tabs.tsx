import React, { ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger } from "@ui/components/ui/tabs";
import { cn } from "@ui/lib/utils";

type Props = {
  triggers: {
    label: string;
    icon?: ReactNode;
  }[];
  children: React.ReactNode;
  className?: string;
  button?: ReactNode;
};

const ZTabsMenu = ({ triggers, children, className, button }: Props) => {
  return (
    <Tabs defaultValue={triggers[0]?.label} className="w-full">
      <TabsList className={cn("", className)}>
        {triggers.map((trigger, key) => (
          <TabsTrigger key={key} value={trigger.label} className="flex gap-2 font-semibold capitalize">
            {trigger.icon && trigger.icon}
            {trigger.label}
          </TabsTrigger>
        ))}
        {button}
      </TabsList>
      {children}
    </Tabs>
  );
};

export default ZTabsMenu;

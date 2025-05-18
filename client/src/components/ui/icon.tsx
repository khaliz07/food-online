import React from "react";
import { cn } from "@/lib/utils";

type IconProps = {
  name: string;
  className?: string;
};

export function Icon({ name, className }: IconProps) {
  return (
    <i className={cn(name, className)} />
  );
}

export default Icon;

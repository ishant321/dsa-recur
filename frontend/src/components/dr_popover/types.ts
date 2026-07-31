import type { Placement } from "@floating-ui/react";
import type { ReactNode } from "react";

export interface DrPopoverProps {
  target: ReactNode;
  content: ReactNode;
  placement?: Placement;
  offset?: number;
  className?: string;
}

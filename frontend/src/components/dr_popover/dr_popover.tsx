import { useState } from "react";
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset as floatingOffset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import type { DrPopoverProps } from "./types";
import "./index.scss";

export default function DrPopover({
  target,
  content,
  placement = "bottom-start",
  offset = 8,
  className = "",
}: DrPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    middleware: [floatingOffset(offset), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  return (
    <>
      <span
        ref={refs.setReference}
        className="dr-popover__target"
        {...getReferenceProps()}
      >
        {target}
      </span>

      {isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            className={`dr-popover ${className}`}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {content}
          </div>
        </FloatingPortal>
      )}
    </>
  );
}

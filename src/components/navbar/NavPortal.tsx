"use client";

import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

const noopSubscribe = () => () => {};
export const useHasMounted = () =>
  useSyncExternalStore(noopSubscribe, () => true, () => false);

export function NavPortal({ children }: { children: React.ReactNode }) {
  const mounted = useHasMounted();
  if (!mounted) return null;
  return createPortal(children, document.body);
}

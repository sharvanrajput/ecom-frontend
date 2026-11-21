"use client";

import { usePathname } from "next/navigation";

export function ReturnPathname() {
  const path = usePathname();
  return path;
}

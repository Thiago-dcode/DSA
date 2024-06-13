import { speed } from "@/data_structures/stack/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
export const getSpeed = (speed: speed) => {
  switch (speed) {
    case 1:
      return 0.7;
    case 2:
      return 0.5;
    case 3:
      return 0.3;

    default:
      return 0.5;
  }
};

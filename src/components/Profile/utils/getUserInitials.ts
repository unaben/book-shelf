import type { IUser } from "@/types/interface";

export const getUserInitials = (user: IUser | null) => {
  if (!user?.name) return "U";
  return user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

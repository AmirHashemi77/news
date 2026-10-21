import type { IconType } from "react-icons";
import type { EditProfileInput } from "../schema/editProfile.schema";

export type EditProfileErrors = Partial<Record<keyof EditProfileInput, string[]>>;

export type EditProfileResult =
  | { status: "success"; message: string; data: EditProfileInput }
  | { status: "validation-error"; message: string; errors: EditProfileErrors }
  | { status: "unauthorized" | "error"; message: string };

export interface DemoProfile {
  name: string;
  userName: string;
  memberId: string;
  email: string;
  avatarUrl: string;
  membership: string;
}

export interface ProfileSection {
  title: string;
  href: string;
  description: string;
  icon: IconType;
}

export interface UserViewListInput {
  userId: string;
  pageSize: number;
  pageNumber: number;
}

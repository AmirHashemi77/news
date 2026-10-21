import type { Metadata } from "next";
import ProfileSectionPage from "@/features/user/profile/components/ProfileSectionPage";
import { profileSections } from "@/features/user/profile/config/profileSections";

export const metadata: Metadata = { title: profileSections.password.title };

export default function ChangePasswordPage() {
  return (
    <ProfileSectionPage icon={profileSections.password.icon} title={profileSections.password.title}>
      c
    </ProfileSectionPage>
  );
}

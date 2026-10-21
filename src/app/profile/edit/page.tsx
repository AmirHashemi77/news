import type { Metadata } from "next";
import ProfileSectionPage from "@/features/user/profile/components/ProfileSectionPage";
import EditProfileForm from "@/features/user/profile/components/EditProfileForm";
import { profileSections } from "@/features/user/profile/config/profileSections";
import { getCurrentUser } from "@/features/user/session/server/session.server";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: profileSections.edit.title };

export default async function EditProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }
  return (
    <ProfileSectionPage icon={profileSections.edit.icon} title={profileSections.edit.title}>
      <EditProfileForm defaultValues={{ firstName: user.firstName, lastName: user.lastName, userName: user.userName, email: user.email }} />
    </ProfileSectionPage>
  );
}

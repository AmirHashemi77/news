import type { Metadata } from "next";
import ProfileSectionPage from "@/features/user/profile/components/ProfileSectionPage";
import { profileSections } from "@/features/user/profile/config/profileSections";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/features/user/session/server/session.server";
import { userNewsViewServices } from "@/features/user/profile/server/profile.server";
import { FiClock } from "react-icons/fi";
import NewsList from "@/features/newsList/components/NewsList";

export const metadata: Metadata = { title: profileSections.recent.title };

interface PropsType {
  searchParams: {
    pageNumber: string;
  };
}

export default async function RecentNewsPage({ searchParams }: PropsType) {
  const { pageNumber } = searchParams;
  const user = await getCurrentUser();

  if (!user) {
    toast.info("برای دسترسی به این بخش ، با حساب کاربری خود وارد شوید .");
    redirect("/login");
  }

  const data = await userNewsViewServices({ userId: user.id, pageNumber: pageNumber ? +pageNumber : 1, pageSize: 10 });

  return (
    <ProfileSectionPage icon={profileSections.recent.icon} title={profileSections.recent.title}>
      <NewsList pagination={true} newsData={data.data} moreUrl={null} />
    </ProfileSectionPage>
  );
}

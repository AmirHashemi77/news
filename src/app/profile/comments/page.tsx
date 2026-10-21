import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import ProfileSectionPage from "@/features/user/profile/components/ProfileSectionPage";
import { profileSections } from "@/features/user/profile/config/profileSections";
import { getUserCommentsServices } from "@/features/user/profile/server/profile.server";
import { getCurrentUser } from "@/features/user/session/server/session.server";
import { formatPersianDate } from "@/shared/lib/formatDate";
import { Pagination } from "@/features/newsList/components/NewsListPagination";

export const metadata: Metadata = { title: profileSections.comments.title };

interface PropsType {
  searchParams: Promise<{
    pageNumber?: string;
  }>;
}

export default async function ProfileCommentsPage({ searchParams }: PropsType) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const { pageNumber } = await searchParams;
  const currentPage = pageNumber ? +pageNumber : 1;

  if (!Number.isSafeInteger(currentPage) || currentPage < 1 || currentPage > 1_000_000) {
    redirect("/profile/comments");
  }

  const comments = await getUserCommentsServices({ userId: user.id, pageNumber: currentPage, pageSize: 10 });
  const lastPage = Math.max(1, comments.data.pagination.totalPages);

  if (currentPage > lastPage) {
    redirect(`/profile/comments?pageNumber=${lastPage}`);
  }

  return (
    <ProfileSectionPage icon={profileSections.comments.icon} title={profileSections.comments.title}>
      {comments.data.pagination.totalCount === 0 ? (
        <p className="mt-6 text-sm leading-7 text-gray-500">هنوز نظری ثبت نکرده‌اید.</p>
      ) : (
        <ul className="mt-6 w-full space-y-4 text-start">
          {comments.data.commentsList.map((comment) => (
            <li key={comment.id}>
              <article className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <time dateTime={comment.createdAt.toISOString()} className="text-xs text-gray-500">
                  {formatPersianDate(comment.createdAt)}
                </time>
                <p className="mt-3 whitespace-pre-wrap wrap-break-word text-sm leading-7 text-gray-700">{comment.commentText}</p>
                <div className="mt-4 border-t border-gray-200 pt-3 text-sm leading-7">
                  <span className="text-gray-500">خبر مرتبط: </span>
                  <Link href={`/news/${comment.news.id}`} className="wrap-break-word font-medium text-gray-900 underline underline-offset-4 hover:text-gray-600">
                    {comment.news.title}
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
      {comments.data.pagination.totalPages >= 1 && (
        <div className="mt-6">
          <Pagination totalPages={comments.data.pagination.totalPages} />
        </div>
      )}
    </ProfileSectionPage>
  );
}

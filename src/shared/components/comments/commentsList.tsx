import { FiMessageCircle, FiUser } from "react-icons/fi";
import CommentsInput from "./commentsInput";
import { getNewsCommentsService } from "@/features/newsDetails/server/newsDetails.server";
import { formatPersianDate } from "@/shared/lib/formatDate";

interface CommentsListProps {
  articleId: string;
}

export default async function CommentsList({ articleId }: CommentsListProps) {
  const comments = await getNewsCommentsService(articleId);

  return (
    <section key={articleId} aria-labelledby="comments-title" className="border-t border-gray-100 bg-white px-5 py-7 sm:px-8">
      <div className="flex items-center gap-2">
        <FiMessageCircle className="size-5 text-gray-700" aria-hidden="true" />
        <h2 id="comments-title" className="text-lg font-bold text-gray-900">
          نظرات ({comments.data?.comments.length.toLocaleString("fa-IR")})
        </h2>
      </div>

      {/* <CommentsInput onSubmit={addComment} /> */}

      <div className="mt-7 space-y-4">
        {comments.data?.comments.map((comment) => (
          <article key={comment.id} className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-gray-200 text-gray-600" aria-hidden="true">
                <FiUser className="size-4" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{`${comment.author.firstName} ${comment.author.lastName}`}</h3>
                <time className="text-[11px] text-gray-400">{formatPersianDate(comment.createdAt)}</time>
              </div>
            </div>
            <p className="mt-3 text-sm leading-7 text-gray-700">{comment.commentText}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

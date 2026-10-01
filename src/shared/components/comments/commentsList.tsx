"use client";

import { useState } from "react";
import { FiMessageCircle, FiUser } from "react-icons/fi";
import CommentsInput from "./commentsInput";

interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
}

interface CommentsListProps {
  articleId: string;
}

const initialComments: Comment[] = [
  {
    id: 1,
    author: "مریم احمدی",
    text: "گزارش خوبی بود و موضوع را به شکل ساده توضیح داده بود.",
    date: "امروز",
  },
  {
    id: 2,
    author: "رضا کریمی",
    text: "لطفاً درباره پیامدهای این خبر هم گزارش‌های بیشتری منتشر کنید.",
    date: "دیروز",
  },
];

export default function CommentsList({ articleId }: CommentsListProps) {
  const [comments, setComments] = useState(initialComments);

  function addComment(text: string) {
    setComments((currentComments) => [
      ...currentComments,
      {
        id: Date.now(),
        author: "کاربر مهمان",
        text,
        date: "همین حالا",
      },
    ]);
  }

  return (
    <section key={articleId} aria-labelledby="comments-title" className="border-t border-gray-100 bg-white px-5 py-7 sm:px-8">
      <div className="flex items-center gap-2">
        <FiMessageCircle className="size-5 text-gray-700" aria-hidden="true" />
        <h2 id="comments-title" className="text-lg font-bold text-gray-900">
          نظرات ({comments.length.toLocaleString("fa-IR")})
        </h2>
      </div>

      <CommentsInput onSubmit={addComment} />

      <div className="mt-7 space-y-4">
        {comments.map((comment) => (
          <article key={comment.id} className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-gray-200 text-gray-600" aria-hidden="true">
                <FiUser className="size-4" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{comment.author}</h3>
                <time className="text-[11px] text-gray-400">{comment.date}</time>
              </div>
            </div>
            <p className="mt-3 text-sm leading-7 text-gray-700">{comment.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

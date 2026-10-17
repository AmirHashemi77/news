"use client";

import { FormEvent, useState } from "react";
import { FiSend } from "react-icons/fi";
import { createCommentAction } from "../action/comment.action";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CommentsInputProps {
  articleId: string;
}

export default function CommentsInput({ articleId }: CommentsInputProps) {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requiresLogin, setRequiresLogin] = useState(false);

  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;
    const commentText = text.trim();

    if (!commentText) {
      setError("متن نظر را وارد کنید");
      return;
    }
    setError(null);
    setRequiresLogin(false);
    setIsSubmitting(true);

    try {
      const result = await createCommentAction({ newsId: articleId, commentText: commentText });
      if (result.status === "success") {
        setText("");
        toast.success(result.message);
        router.refresh();
        return;
      }
      if (result.status === "unauthorized") {
        setError(result.message);
        setRequiresLogin(true);
        return;
      }

      if (result.status === "validation-error") {
        const commentError = result.errors.find((item) => item.field === "commentText");

        setError(commentError?.message ?? result.message);
        return;
      }

      setError(result.message);
    } catch (error) {
      console.error("Create comment failed:", error);
      setError("ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5">
      <label htmlFor="news-comment" className="mb-2 block text-sm font-medium text-gray-800">
        نظر شما
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <textarea
          id="news-comment"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="نظر خود را درباره این خبر بنویسید..."
          rows={3}
          maxLength={500}
          className="min-h-24 w-full resize-y rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-100"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 text-sm font-medium text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          <FiSend className="size-4" aria-hidden="true" />
          {isSubmitting ? "در حال ارسال..." : "ارسال نظر"}
        </button>
      </div>
      {error && (
        <div id="comment-error" role="alert" className="mt-2 text-sm text-red-600">
          <p>{error}</p>

          {requiresLogin && (
            <Link href="/login" className="mt-1 inline-block font-medium underline underline-offset-4">
              ورود به حساب کاربری
            </Link>
          )}
        </div>
      )}
      <p className="mt-1 text-left text-[11px] text-gray-400">حداکثر ۵۰۰ کاراکتر</p>
    </form>
  );
}

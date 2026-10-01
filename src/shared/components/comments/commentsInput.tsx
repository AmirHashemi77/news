"use client";

import { FormEvent, useState } from "react";
import { FiSend } from "react-icons/fi";

interface CommentsInputProps {
  onSubmit: (text: string) => void;
}

export default function CommentsInput({ onSubmit }: CommentsInputProps) {
  const [text, setText] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const comment = text.trim();

    if (!comment) return;

    onSubmit(comment);
    setText("");
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
          ارسال نظر
        </button>
      </div>
      <p className="mt-1 text-left text-[11px] text-gray-400">حداکثر ۵۰۰ کاراکتر</p>
    </form>
  );
}

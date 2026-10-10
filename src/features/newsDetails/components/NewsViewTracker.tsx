"use client";

import { useEffect } from "react";

type Props = {
  newsId: string;
};

export default function NewsViewTracker({ newsId }: Props) {
  useEffect(() => {
    fetch(`/api/news/${newsId}/view`, {
      method: "POST",
    }).catch(() => {
      // نیازی نیست UI صفحه را خراب کنیم
    });
  }, [newsId]);

  return null;
}

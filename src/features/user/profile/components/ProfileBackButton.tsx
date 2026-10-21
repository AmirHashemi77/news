"use client";

import { useRouter } from "next/navigation";
import { FiArrowRight } from "react-icons/fi";
import { Button } from "@/shared/ui/button";

export default function ProfileBackButton() {
  const router = useRouter();

  function goBack() {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.replace("/profile");
    }
  }

  return (
    <Button variant="ghost" size="icon" onClick={goBack} aria-label="بازگشت به صفحهٔ قبل" className="rounded-full">
      <FiArrowRight className="size-5" aria-hidden="true" />
    </Button>
  );
}

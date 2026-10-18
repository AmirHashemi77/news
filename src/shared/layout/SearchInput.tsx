"use client";

import { FormEvent, KeyboardEvent, useActionState, useId, useRef, useState } from "react";

import { FiSearch } from "react-icons/fi";
import { Button } from "@/shared/ui/button";
import SearchAction from "./action/search.action";
import { SEARCH_MAX_LENGTH, SEARCH_MIN_LENGTH } from "./schemas/search.schema";

interface SearchInputProps {
  placeholder?: string;
  minLength?: number;
}

export function SearchInput({ placeholder = "جستجو...", minLength = SEARCH_MIN_LENGTH }: SearchInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const [state, formAction, isPending] = useActionState(SearchAction, { message: null });
  const inputId = useId();
  const hintId = `${inputId}-hint`;
  const errorId = state.message ? `${inputId}-error` : undefined;

  const formRef = useRef<HTMLFormElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  const minimumLength = Math.max(minLength, SEARCH_MIN_LENGTH);
  const canSearch = value.trim().length >= minimumLength && value.trim().length <= SEARCH_MAX_LENGTH;

  const openSearch = () => {
    setIsOpen(true);

    requestAnimationFrame(() => {
      mobileInputRef.current?.focus();
    });
  };

  const handleMobileSearchButton = () => {
    if (isPending) return;

    if (!isOpen) {
      openSearch();
      return;
    }

    if (!canSearch) return;

    formRef.current?.requestSubmit();
  };

  const handleMobileKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter" || event.nativeEvent.isComposing) return;

    event.preventDefault();

    if (!isOpen || !canSearch || isPending) return;

    formRef.current?.requestSubmit();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (!canSearch || isPending) {
      event.preventDefault();
      return;
    }

    setIsOpen(false);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <Button
          variant="unstyled"
          size="none"
          aria-label="Close search"
          onClick={() => setIsOpen(false)}
          className="
            fixed inset-0 z-50
            bg-black/20
            lg:hidden
          "
        />
      )}

      <form ref={formRef} action={formAction} onSubmit={handleSubmit} role="search" aria-label="جستجوی اخبار" className="relative z-50">
        {/* real value for server action */}
        <input type="hidden" name="searchQuery" value={value} />

        {/* sm / md */}
        <div className="flex lg:hidden">
          <div
            className={`
              flex h-10 items-center
              overflow-hidden rounded-lg
              bg-white shadow-sm
              transition-[width,box-shadow]
              duration-300 ease-in-out
              focus-within:shadow-md
              ${isOpen ? "w-40 md:w-72" : "w-10"}
            `}
          >
            <input
              ref={mobileInputRef}
              type="text"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              onKeyDown={handleMobileKeyDown}
              placeholder={placeholder}
              maxLength={SEARCH_MAX_LENGTH}
              aria-label="متن جستجو"
              aria-describedby={[hintId, errorId].filter(Boolean).join(" ")}
              aria-invalid={!!state.message}
              tabIndex={isOpen ? 0 : -1}
              className={`
                h-full min-w-0 flex-1
                bg-transparent 
                text-sm outline-none
                transition-opacity duration-200
                ${isOpen ? "opacity-100 px-3" : "pointer-events-none opacity-0"}
              `}
            />

            <Button
              variant="ghost"
              size="icon"
              onClick={handleMobileSearchButton}
              aria-label={isOpen ? "جستجو" : "باز کردن جستجو"}
              disabled={isPending || (isOpen && !canSearch)}
              isLoading={isPending}
              loadingText={null}
              className="rounded-none"
            >
              <FiSearch className="size-5 text-icon hover:text-icon-hover" />
            </Button>
          </div>
        </div>

        {/* lg+ */}
        <div
          className="
            hidden h-9 w-80
            items-center overflow-hidden
            rounded-lg border
            border-gray-200 bg-white
            shadow-sm
            transition-shadow duration-300
            focus-within:shadow-md
            lg:flex
          "
        >
          <input
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={placeholder}
            maxLength={SEARCH_MAX_LENGTH}
            aria-label="متن جستجو"
            aria-describedby={[hintId, errorId].filter(Boolean).join(" ")}
            aria-invalid={!!state.message}
            className="
              h-full min-w-0 flex-1
              bg-transparent px-4
              text-sm outline-none
            "
          />

          <Button
            type="submit"
            variant="ghost"
            size="icon"
            disabled={!canSearch}
            isLoading={isPending}
            loadingText={null}
            aria-label="جستجو"
            className="h-full w-11 rounded-none"
          >
            <FiSearch className="size-4 text-icon hover:text-icon-hover" />
          </Button>
        </div>
        <p id={hintId} className="sr-only">برای جستجو حداقل {minimumLength} و حداکثر {SEARCH_MAX_LENGTH} کاراکتر وارد کنید.</p>
        {state.message && (
          <p id={errorId} role="alert" className="absolute end-0 top-full mt-2 w-64 rounded-lg border border-red-100 bg-white p-3 text-sm leading-6 text-red-600 shadow-sm">
            {state.message}
          </p>
        )}
      </form>
    </>
  );
}

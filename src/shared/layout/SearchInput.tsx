"use client";

import { FormEvent, KeyboardEvent, useRef, useState } from "react";

import { FiSearch } from "react-icons/fi";
import { Button } from "@/shared/ui/button";

interface SearchInputProps {
  action: (formData: FormData) => void | Promise<void>;
  placeholder?: string;
  minLength?: number;
}

export function SearchInput({ action, placeholder = "جستجو...", minLength = 5 }: SearchInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  const formRef = useRef<HTMLFormElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  const canSearch = value.trim().length > minLength;

  const openSearch = () => {
    setIsOpen(true);

    requestAnimationFrame(() => {
      mobileInputRef.current?.focus();
    });
  };

  const handleMobileSearchButton = () => {
    if (!isOpen) {
      openSearch();
      return;
    }

    if (!canSearch) return;

    formRef.current?.requestSubmit();
  };

  const handleMobileKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;

    event.preventDefault();

    if (!isOpen || !canSearch) return;

    formRef.current?.requestSubmit();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (!canSearch) {
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

      <form ref={formRef} action={action} onSubmit={handleSubmit} className="relative z-50">
        {/* real value for server action */}
        <input type="hidden" name="query" value={value} />

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
              aria-label="Search"
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
            aria-label="Search"
            className="h-full w-11 rounded-none"
          >
            <FiSearch className="size-4 text-icon hover:text-icon-hover" />
          </Button>
        </div>
      </form>
    </>
  );
}

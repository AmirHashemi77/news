"use client";
import { FC } from "react";
import TextInput from "@/shared/ui/Input/TextInput";
import { FormDateInput } from "@/shared/ui/Input/DateInput";
import { useForm } from "react-hook-form";
import { filterSchema, filterType } from "../schemas/filterSchema";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/ui/button";

const FilteringNews: FC = () => {
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<filterType>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      title: undefined,
      fromDate: null,
      toDate: null,
    },
  });
  const onSubmit = (data: filterType) => {
    const params = new URLSearchParams();

    if (data.title) {
      params.set("title", data.title);
    }
    if (data.fromDate && data.toDate && data.fromDate > data.toDate) {
      setError("fromDate", { message: "مقدار 'از تاریخ' باید کوچک تر از 'تا تاریخ' باشد" });
      return;
    }
    if (data.fromDate) {
      params.set("fromDate", String(data.fromDate.toISOString()));
    }
    if (data.toDate) {
      params.set("toDate", String(data.toDate.toISOString()));
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <form className="flex flex-col items-start gap-3 w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row items-center gap-5 w-full flex-wrap md:flex-nowrap ">
          <TextInput {...register("title")} name="title" label="عنوان" error={errors.title?.message} />
          <FormDateInput label=" از تاریخ" control={control} name="fromDate" />
          <FormDateInput label=" تا تاریخ" control={control} name="toDate" />
        </div>
        <Button className="self-end" type="submit" size="sm" isLoading={isSubmitting} loadingText="صبر کنید ...">
          جستجو
        </Button>
      </form>
    </>
  );
};
export default FilteringNews;

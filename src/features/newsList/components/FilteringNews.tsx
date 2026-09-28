"use client";
import { FC } from "react";
import TextInput from "@/shared/components/ui/Input/TextInput";
import { FormDateInput } from "@/shared/components/ui/Input/DateInput";
import { useForm } from "react-hook-form";
import { filterSchema, filterType } from "../schemas/filterSchema";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

const FilteringNews: FC = () => {
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<filterType>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      title: undefined,
      publishDate: null,
    },
  });
  const onSubmit = (data: filterType) => {
    const params = new URLSearchParams();

    if (data.title) {
      params.set("title", data.title);
    }
    if (data.publishDate) {
      params.set("publishDate", String(data.publishDate));
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <form className="flex flex-col items-start gap-3 w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-row items-center gap-5 w-full flex-wrap md:flex-nowrap ">
        <TextInput {...register("title")} name="title" label="عنوان" error={errors.title?.message} />
        <FormDateInput label="تاریخ انتشار" control={control} name="publishDate" />
      </div>
      <button className="self-end px-3 py-2 flex- items-center justify-center bg-foreground text-background rounded-md cursor-pointer" type="submit">
        جستجو
      </button>
    </form>
  );
};
export default FilteringNews;

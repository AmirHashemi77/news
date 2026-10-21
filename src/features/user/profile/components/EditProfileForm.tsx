"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { FiAtSign, FiMail, FiRotateCcw, FiSave, FiUser } from "react-icons/fi";
import { toast } from "sonner";
import TextInput from "@/shared/ui/Input/TextInput";
import { Button } from "@/shared/ui/button";
import { updateProfileAction } from "../action/profile.action";
import { editProfileSchema, type EditProfileInput } from "../schema/editProfile.schema";

interface EditProfileFormProps {
  defaultValues: EditProfileInput;
}

export default function EditProfileForm({ defaultValues }: EditProfileFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<EditProfileInput>({
    resolver: zodResolver(editProfileSchema),
    defaultValues,
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<EditProfileInput> = async (values) => {
    try {
      const result = await updateProfileAction(values);

      if (result.status === "validation-error") {
        let shouldFocus = true;
        for (const field of ["firstName", "lastName", "userName", "email"] as const) {
          const message = result.errors[field]?.[0];
          if (message) {
            setError(field, { type: "server", message }, { shouldFocus });
            shouldFocus = false;
          }
        }
        return;
      }
      if (result.status !== "success") {
        setError("root", { message: result.message });
        if (result.status === "unauthorized") {
          toast.info(result.message);
          router.push("/login");
        }
        return;
      }

      reset(result.data);
      toast.success(result.message);
      router.refresh();
    } catch {
      setError("root", { message: "ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید." });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="ویرایش اطلاعات پروفایل" aria-busy={isSubmitting} className="mt-3 w-full min-w-0 text-right">
      <p className="mb-7 text-center text-sm leading-7 text-gray-500">اطلاعات حساب کاربری خود را ویرایش کنید و تغییرات را ذخیره کنید.</p>

      <fieldset disabled={isSubmitting} className="min-w-0 border-0 p-0">
        <legend className="sr-only">اطلاعات شخصی و حساب کاربری</legend>
        <div className="grid grid-cols-1 gap-x-5 gap-y-1 sm:grid-cols-2">
          <TextInput
            label="نام"
            placeholder="نام خود را وارد کنید"
            autoComplete="given-name"
            maxLength={50}
            required
            startIcon={<FiUser className="size-4" aria-hidden="true" />}
            error={errors.firstName?.message}
            aria-invalid={!!errors.firstName}
            {...register("firstName")}
          />
          <TextInput
            label="نام خانوادگی"
            placeholder="نام خانوادگی خود را وارد کنید"
            autoComplete="family-name"
            maxLength={50}
            required
            startIcon={<FiUser className="size-4" aria-hidden="true" />}
            error={errors.lastName?.message}
            aria-invalid={!!errors.lastName}
            {...register("lastName")}
          />
          <TextInput
            label="نام کاربری"
            placeholder="username"
            dir="ltr"
            autoComplete="username"
            autoCapitalize="none"
            spellCheck={false}
            maxLength={30}
            required
            startIcon={<FiAtSign className="size-4" aria-hidden="true" />}
            error={errors.userName?.message}
            aria-invalid={!!errors.userName}
            {...register("userName")}
          />
          <TextInput
            label="ایمیل"
            placeholder="example@email.com"
            type="email"
            inputMode="email"
            dir="ltr"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            required
            startIcon={<FiMail className="size-4" aria-hidden="true" />}
            error={errors.email?.message}
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </div>

        {errors.root?.message && (
          <p role="alert" className="mb-5 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm leading-6 text-red-600">
            {errors.root.message}
          </p>
        )}

        <div className="mt-2 flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={() => reset()} disabled={!isDirty || isSubmitting}>
            <FiRotateCcw className="size-4" aria-hidden="true" />
            بازنشانی تغییرات
          </Button>
          <Button type="submit" disabled={!isDirty} isLoading={isSubmitting} loadingText="در حال ذخیره...">
            <FiSave className="size-4" aria-hidden="true" />
            ذخیره تغییرات
          </Button>
        </div>
      </fieldset>
    </form>
  );
}

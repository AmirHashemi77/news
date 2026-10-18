"use client";

import Link from "next/link";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FiAtSign, FiCheckCircle, FiEye, FiEyeOff, FiLock, FiLogIn, FiMail, FiPhone, FiUser, FiUsers } from "react-icons/fi";

import { SignupInput, signupInputSchema } from "@/features/user/signup/schema/signupInput.schema";

import TextInput from "@/shared/ui/Input/TextInput";
import { Button } from "@/shared/ui/button";
import { SelectBox } from "@/shared/ui/selectbox";
import { fetchData } from "@/shared/api/fetchData";
import { Gender } from "@/generated/prisma/enums";
import { toast } from "sonner";

interface ErrorType {
  status: string;
  message: string;
}

interface ResponseType {
  message: string;
  user: {
    firstName: string;
    lastName: string;
    userName: string;
    phoneNumber: string;
    gender: Gender;
    email: string;
    id: string;
  };
}

const Signup: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupInputSchema),

    defaultValues: {
      firstName: "",
      lastName: "",
      userName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<SignupInput> = async (data) => {
    try {
      const result = await fetchData<ResponseType, ErrorType, SignupInput>("/api/signup", {
        method: "POST",
        body: data,
        cache: "no-cache",
      });
      if (!result.ok) {
        if (result.error.status === "email-already-exists") {
          setError("email", { message: result.error.message });
        }
        if (result.error.status === "username-already-exists") {
          setError("userName", { message: result.error.message });
        }
        if (result.error.status === "phone-number-already-exists") {
          setError("phoneNumber", { message: result.error.message });
        }
      }
    } catch (error) {
      {
        console.log("===================================================");
        console.error("Signup request failed:", error);
        console.log("===================================================");
        toast.error("ارتباط با سرور برقرار نشد. لطفاً اتصال اینترنت خود را بررسی و دوباره تلاش کنید.");
      }
    }
  };

  return (
    <main dir="rtl" className="flex min-h-[calc(100vh-5rem)] w-full items-center justify-center bg-gray-50 px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="relative hidden overflow-hidden bg-foreground p-10 text-background lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-20 -top-20 size-64 rounded-full border border-white/10" />
          <div className="absolute -bottom-24 -left-16 size-72 rounded-full border border-white/10" />

          <div className="relative">
            <div className="mb-7 flex size-12 items-center justify-center rounded-xl bg-white/10">
              <FiUsers className="size-6" />
            </div>

            <h2 className="mb-3 text-2xl font-bold">به جمع ما بپیوندید</h2>

            <p className="max-w-sm text-sm leading-7 text-white/70">با ساخت حساب کاربری می‌توانید اخبار مورد علاقه خود را ذخیره کنید، دیدگاه بنویسید و تجربه شخصی‌تری از سایت داشته باشید.</p>
          </div>

          <div className="relative flex flex-col gap-6">
            <div className="flex flex-col gap-4 text-sm text-white/80">
              <div className="flex items-center gap-3">
                <FiCheckCircle className="size-5 shrink-0" />
                <span>ذخیره اخبار مورد علاقه</span>
              </div>

              <div className="flex items-center gap-3">
                <FiCheckCircle className="size-5 shrink-0" />
                <span>ثبت دیدگاه برای خبرها</span>
              </div>

              <div className="flex items-center gap-3">
                <FiCheckCircle className="size-5 shrink-0" />
                <span>دسترسی به تاریخچه خبرهای مشاهده‌شده</span>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm leading-7 text-white/80">قبلاً حساب کاربری ساخته‌اید؟</p>

              <Link href="/login" className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-white transition-opacity hover:opacity-80">
                <FiLogIn className="size-4" />

                <span>ورود به حساب کاربری</span>
              </Link>
            </div>
          </div>
        </aside>

        <section className="p-5 sm:p-8 lg:p-10">
          <header className="mb-7">
            <div className="mb-3 flex items-center gap-3 lg:hidden">
              <div className="flex size-10 items-center justify-center rounded-lg bg-gray-100">
                <FiUsers className="size-5 text-foreground" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-foreground">ایجاد حساب کاربری</h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">اطلاعات زیر را برای ساخت حساب کاربری تکمیل کنید.</p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col">
            <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
              {/* نام */}
              <TextInput
                label="نام"
                placeholder="نام"
                autoComplete="given-name"
                startIcon={<FiUser className="size-4" />}
                error={errors.firstName?.message}
                aria-invalid={!!errors.firstName}
                {...register("firstName")}
              />

              {/* نام خانوادگی */}
              <TextInput
                label="نام خانوادگی"
                placeholder="نام خانوادگی"
                autoComplete="family-name"
                startIcon={<FiUser className="size-4" />}
                error={errors.lastName?.message}
                aria-invalid={!!errors.lastName}
                {...register("lastName")}
              />

              {/* نام کاربری */}
              <TextInput
                label="نام کاربری"
                placeholder="username"
                dir="ltr"
                autoComplete="username"
                startIcon={<FiAtSign className="size-4" />}
                error={errors.userName?.message}
                aria-invalid={!!errors.userName}
                {...register("userName")}
              />

              {/* شماره موبایل */}
              <TextInput
                label="شماره موبایل"
                placeholder="09123456789"
                dir="ltr"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                startIcon={<FiPhone className="size-4" />}
                error={errors.phoneNumber?.message}
                aria-invalid={!!errors.phoneNumber}
                {...register("phoneNumber")}
              />

              {/* ایمیل */}
              <div className="md:col-span-2">
                <TextInput
                  label="ایمیل"
                  placeholder="example@email.com"
                  dir="ltr"
                  type="email"
                  autoComplete="email"
                  startIcon={<FiMail className="size-4" />}
                  error={errors.email?.message}
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
              </div>

              {/* جنسیت */}
              <SelectBox
                label="جنسیت"
                placeholder="انتخاب جنسیت"
                startIcon={<FiUsers className="size-4" />}
                options={[
                  { value: "MALE", label: "مرد" },
                  { value: "FEMALE", label: "زن" },
                ]}
                error={errors.gender?.message}
                {...register("gender")}
              />

              <div className="hidden md:block" />

              {/* رمز عبور */}
              <TextInput
                label="رمز عبور"
                placeholder="رمز عبور"
                dir="ltr"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                startIcon={<FiLock className="size-4" />}
                endIcon={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-gray-400"
                    aria-label={showPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? <FiEyeOff className="size-4" /> : <FiEye className="size-4" />}
                  </Button>
                }
                error={errors.password?.message}
                aria-invalid={!!errors.password}
                {...register("password")}
              />

              {/* تکرار رمز عبور */}
              <TextInput
                label="تکرار رمز عبور"
                placeholder="تکرار رمز عبور"
                dir="ltr"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                startIcon={<FiLock className="size-4" />}
                endIcon={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="text-gray-400"
                    aria-label={showConfirmPassword ? "مخفی کردن تکرار رمز عبور" : "نمایش تکرار رمز عبور"}
                    aria-pressed={showConfirmPassword}
                  >
                    {showConfirmPassword ? <FiEyeOff className="size-4" /> : <FiEye className="size-4" />}
                  </Button>
                }
                error={errors.confirmPassword?.message}
                aria-invalid={!!errors.confirmPassword}
                {...register("confirmPassword")}
              />
            </div>

            {/* توضیح قوانین رمز */}
            <div className="-mt-2 mb-6 rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
              <div className="flex gap-2">
                <FiLock className="mt-0.5 size-4 shrink-0 text-gray-400" />

                <p className="text-xs leading-6 text-gray-500">رمز عبور باید حداقل ۸ کاراکتر باشد و شامل حداقل یک عدد، یک حرف بزرگ و یک حرف کوچک انگلیسی باشد.</p>
              </div>
            </div>

            {/* لینک ورود در موبایل */}
            <div className="mb-5 flex items-center justify-center gap-1 text-sm lg:hidden">
              <span className="text-gray-500">قبلاً حساب کاربری دارید؟</span>

              <Link href="/login" className="inline-flex items-center gap-1 font-medium text-foreground transition-opacity hover:opacity-70">
                <FiLogIn className="size-4" />

                <span>ورود</span>
              </Link>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              fullWidth
              isLoading={isSubmitting}
              loadingText="در حال ثبت‌نام ..."
              className="sm:self-end md:w-auto md:min-w-40"
            >
              <FiUser className="size-4" />

              <span>ایجاد حساب کاربری</span>
            </Button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default Signup;

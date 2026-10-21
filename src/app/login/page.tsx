"use client";

import Link from "next/link";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiAtSign, FiEye, FiEyeOff, FiLock, FiLogIn, FiUser } from "react-icons/fi";

import TextInput from "@/shared/ui/Input/TextInput";
import { Button } from "@/shared/ui/button";
import { LoginInput, loginInputSchema } from "@/features/user/logIn/schema/loginInput.schema";
import { fetchData } from "@/shared/api/fetchData";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ErrorType {
  status: string;
  message: string;
}

interface LoginResponse {
  status: string;
  message: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    userName: string;
  };
}

const Login: FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginInputSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    try {
      const result = await fetchData<LoginResponse, ErrorType, LoginInput>("/api/login", {
        method: "POST",
        body: data,
      });

      if (!result.ok) {
        if (result.error.status === "invalid-identifier" || result.error.status === "invalid-password") {
          setError("root.credentials", {
            type: "server",
            message: "نام کاربری یا رمز عبور صحیح نیست.",
          });

          return;
        }
      }
      toast.success("ورود با موفقیت انجام شد.");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log("===================================================");
      console.error("Login request failed:", error);
      console.log("===================================================");
      toast.error("ارتباط با سرور برقرار نشد. لطفاً اتصال اینترنت خود را بررسی و دوباره تلاش کنید.");
    }
  };

  return (
    <main dir="rtl" className="flex min-h-[calc(100vh-5rem)] w-full items-center justify-center bg-gray-50 px-4 py-10">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="relative hidden overflow-hidden bg-foreground p-10 text-background lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-20 -top-20 size-64 rounded-full border border-white/10" />
          <div className="absolute -bottom-24 -left-16 size-72 rounded-full border border-white/10" />

          <div className="relative">
            <div className="mb-7 flex size-12 items-center justify-center rounded-xl bg-white/10">
              <FiLogIn className="size-6" />
            </div>

            <h2 className="mb-3 text-2xl font-bold">خوش آمدید</h2>

            <p className="max-w-sm text-sm leading-7 text-white/70">وارد حساب کاربری خود شوید تا به اخبار ذخیره‌شده، دیدگاه‌ها و تجربه شخصی‌سازی‌شده خود دسترسی داشته باشید.</p>
          </div>

          <div className="relative rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm leading-7 text-white/80">هنوز حساب کاربری ندارید؟</p>

            <Link href="/signup" className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-white transition-opacity hover:opacity-80">
              <FiUser className="size-4" />
              ساخت حساب کاربری
            </Link>
          </div>
        </aside>

        <section className="p-5 sm:p-8 lg:p-10">
          <header className="mb-7">
            <div className="mb-3 flex items-center gap-3 lg:hidden">
              <div className="flex size-10 items-center justify-center rounded-lg bg-gray-100">
                <FiLogIn className="size-5 text-foreground" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-foreground">ورود به حساب کاربری</h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">نام کاربری، ایمیل یا شماره موبایل و رمز عبور خود را وارد کنید.</p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col">
            <TextInput
              label="نام کاربری، ایمیل یا شماره موبایل"
              placeholder="example@email.com"
              autoComplete="username"
              dir="ltr"
              startIcon={<FiAtSign className="size-4" />}
              error={errors.identifier?.message}
              aria-invalid={!!errors.identifier}
              {...register("identifier")}
            />

            <TextInput
              label="رمز عبور"
              placeholder="رمز عبور"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              dir="ltr"
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

            <div className="-mt-2 mb-6 flex items-center justify-between gap-4 text-sm">
              <Link href="/forgot-password" className="text-gray-500 transition-colors hover:text-foreground">
                رمز عبور را فراموش کرده‌اید؟
              </Link>

              <Link href="/signup" className="font-medium text-foreground transition-opacity hover:opacity-70 lg:hidden">
                ثبت‌نام
              </Link>
            </div>
            {errors.root?.credentials?.message && (
              <p role="alert" className="mb-4 text-sm text-red-600">
                {errors.root.credentials.message}
              </p>
            )}
            <Button type="submit" size="lg" fullWidth isLoading={isSubmitting} loadingText="در حال ورود ..." className="sm:self-end md:w-auto md:min-w-36">
              <FiLogIn className="size-4" />

              <span>ورود</span>
            </Button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default Login;

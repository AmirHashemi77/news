import type { Metadata } from "next";
import { FiArrowUpLeft, FiClock, FiGrid, FiMail, FiMessageSquare, FiPhone } from "react-icons/fi";
import { ButtonLink } from "@/shared/ui/button";

export const metadata: Metadata = {
  title: "دربارهٔ ما | مهم‌ترین‌ها، بدون حاشیه",
  description: "با هدف و رویکرد ما برای دسترسی ساده‌تر به خبرهای روز، مرور موضوعات مختلف و گفت‌وگو دربارهٔ خبرها آشنا شوید.",
};

const features = [
  {
    title: "مرور تازه‌ترین خبرها",
    description: "خبرهای تازه را در یک جا دنبال کنید و برای خواندن جزئیات، به صفحهٔ هر خبر بروید.",
    icon: FiClock,
  },
  {
    title: "موضوعات مورد علاقهٔ شما",
    description: "از میان دسته‌بندی‌های خبری، موضوعی را انتخاب کنید که برایتان مهم‌تر است.",
    icon: FiGrid,
  },
  {
    title: "جایی برای دیدگاه شما",
    description: "زیر هر خبر، دیدگاهتان را بنویسید و نظر دیگر خوانندگان را بخوانید.",
    icon: FiMessageSquare,
  },
];

export default function AboutUsPage() {
  return (
    <main dir="rtl" aria-labelledby="about-title" className="mx-auto flex w-full max-w-5xl flex-col gap-8 py-6 sm:gap-12 sm:py-10">
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-6 py-8 sm:px-10 sm:py-12">
          <p className="mb-4 text-sm font-medium text-gray-500">دربارهٔ ما</p>
          <h1 id="about-title" className="text-3xl font-bold leading-relaxed text-foreground sm:text-4xl">
            مهم‌ترین‌ها، بدون حاشیه
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-gray-600">
            در میان حجم زیاد خبرها، پیدا کردن آنچه برای ما مهم است همیشه آسان نیست. هدف ما این است که دسترسی به خبرهای روز، مرور موضوعات مختلف و خواندن جزئیات، ساده‌تر و منظم‌تر باشد.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href="/newsList/latestNews" size="lg">
              آخرین اخبار
              <FiArrowUpLeft className="size-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/categoryList" variant="outline" size="lg">
              دسته‌بندی خبرها
            </ButtonLink>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-6 sm:px-10">
          <h2 className="text-lg font-semibold text-foreground">خبر خواندن، با تمرکز بیشتر</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-600">
            اینجا می‌توانید ابتدا تیترها را مرور کنید، موضوع مورد علاقه‌تان را پیدا کنید و سپس خبر را با جزئیات بخوانید. ما تلاش می‌کنیم مسیر رسیدن شما به خبر، روشن و کوتاه باشد.
          </p>
        </div>
      </section>

      <section aria-labelledby="features-title">
        <h2 id="features-title" className="mb-5 text-xl font-bold text-foreground">اینجا چه چیزی پیدا می‌کنید؟</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {features.map(({ title, description, icon: Icon }) => (
            <article key={title} className="rounded-2xl border border-gray-200 bg-white p-6">
              <span className="mb-5 inline-flex size-11 items-center justify-center rounded-xl bg-gray-100 text-icon">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="text-base font-semibold text-foreground">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-gray-600">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="contact-title" className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
        <h2 id="contact-title" className="text-xl font-bold text-foreground">اطلاعات تماس</h2>
        <p className="mt-2 text-sm leading-7 text-gray-500">اطلاعات زیر فعلاً نمایشی هستند.</p>
        <dl className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
            <dt className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <FiMail className="size-4 text-icon" aria-hidden="true" />
              آدرس ایمیل
            </dt>
            <dd className="mt-3 text-base font-medium text-foreground">
              <bdi dir="ltr">info@example.com</bdi>
            </dd>
          </div>
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
            <dt className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <FiPhone className="size-4 text-icon" aria-hidden="true" />
              شماره تماس
            </dt>
            <dd className="mt-3 text-base font-medium tabular-nums text-foreground">
              <bdi dir="ltr">021-0000-0000</bdi>
            </dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="conversation-title" className="rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
        <h2 id="conversation-title" className="text-xl font-bold leading-relaxed text-foreground">گفت‌وگو از زیر هر خبر شروع می‌شود</h2>
        <p className="mt-3 max-w-3xl text-sm leading-8 text-gray-600">
          نگاه شما بخشی از گفت‌وگو دربارهٔ خبرهاست. با ورود به حساب کاربری می‌توانید زیر خبرها نظر بنویسید و در کنار دیگر خوانندگان، موضوعات را از زاویه‌های مختلف ببینید.
        </p>
        <ButtonLink href="/" variant="outline" className="mt-5">
          بازگشت به خبرها
          <FiArrowUpLeft className="size-4" aria-hidden="true" />
        </ButtonLink>
      </section>
    </main>
  );
}

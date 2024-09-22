"use client";
import { useRouter } from "next/router";

export default function LanguageSwitcher() {
  const router = useRouter();
  const { locales, locale: currentLocale } = router;

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  return (
    <select onChange={changeLanguage} defaultValue={currentLocale}>
      {locales?.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
}

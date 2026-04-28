"use client";

import Link from "next/link";
import { FileSpreadsheet } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { LanguageSwitcher } from "./language-switcher";

export function Header() {
  const { t } = useI18n();
  return (
    <header className="sticky top-0 z-10 border-b bg-[hsl(var(--background))]/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-6 px-5">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <FileSpreadsheet className="h-5 w-5" />
          <span className="text-sm">{t("appName")}</span>
        </Link>
        <div className="ml-auto flex items-center gap-3">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}

"use client"

import { useTranslations } from "@/hooks/use-translations"

export function TranslatedText({ section, textKey }: { section: string; textKey: string }) {
  const { t } = useTranslations()
  return <>{t(textKey, section)}</>
}

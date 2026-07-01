import type { ReactNode } from "react";

export function T({ en, vi }: { en: ReactNode; vi: ReactNode }) {
  return (
    <>
      <span className="i18n-en">{en}</span>
      <span className="i18n-vi">{vi}</span>
    </>
  );
}

import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { useRouter } from "next/router";
import BostaArabicLogo from "@/icons/bostaArabicLogo";
import BostaEnglishLogo from "@/icons/bostaEnglishLogo";

export default function Navbar() {
  const { t, lang } = useTranslation("tracking");
  const router = useRouter();
  return (
    <nav className="bg-white shadow  ">
      <div className="container flex flex-row items-center justify-center py-6 mx-auto text-gray-600 max-w-7xl md:px-0 px-6">
        <BostaEnglishLogo
          width={120}
          height={36}
          className="ltr:mr-auto rtl:ml-auto"
        />

        <div className="flex flex-row">
          <p
            className="text-gray-800 mx-1.5 sm:mx-6 font-bold"
            onClick={() => router.push(`/`)}
          >
            {t("main")}
          </p>
          <p className="text-gray-800 mx-1.5 sm:mx-6 font-bold">
            {t("prices")}
          </p>
          <p className="text-gray-800 mx-1.5 sm:mx-6 font-bold">
            {t("contact")}
          </p>
        </div>

        <div className="ltr:ml-auto rtl:mr-auto flex flex-row">
          <p className="text-gray-800 mx-1.5 sm:mx-6 font-bold">{t("track")}</p>
          <p className="text-gray-800 mx-1.5 sm:mx-6 font-bold">
            {t("signIn")}
          </p>
          <button
            onClick={() =>
              lang === "ar"
                ? (window.location.href = `/en/${router.asPath}`)
                : (window.location.href = `/ar/${router.asPath}`)
            }
            className={"text-red-600 font-bold text-lg"}
          >
            {lang === "ar" ? "ENG" : "عربي"}
          </button>
        </div>
      </div>
    </nav>
  );
}

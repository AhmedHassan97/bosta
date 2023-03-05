import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Cairo } from "next/font/google";
import useTranslation from "next-translate/useTranslation";
import I18nProvider from "next-translate/I18nProvider";
import Navbar from "@/app/components/navbar";
import { store } from "../app/redux/store";
import { Provider } from "react-redux";
import clsx from "clsx";

const cairo = Cairo({
  subsets: ["latin", "arabic", "latin-ext"],
  style: "normal",
});

export default function App({ Component, pageProps }: AppProps) {
  const { t, lang } = useTranslation("tracking");

  return (
    <main
      className={clsx(cairo.className, "h-screen overflow-auto")}
      dir={lang === "en" ? "ltr" : "rtl"}
    >
      <I18nProvider lang={lang}>
        <Provider store={store}>
          <Navbar />
          <Component {...pageProps} />
        </Provider>
      </I18nProvider>
    </main>
  );
}

import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React from "react";

export default function Home() {
  const { t, lang } = useTranslation("tracking");
  const [trackingInput, setTrackingInput] = React.useState<number>();
  const router = useRouter();

  const goToTransaction = (trackingNumber: number) => {
    router.push(`${lang}/shipment/${trackingNumber}`);
  };
  return (
    <div
      className="bg-blue-100 w-full"
      style={{
        height: "90vh",
      }}
    >
      <div className="w-full pt-48 flex flex-row justify-center ">
        <input
          type="number"
          placeholder={t("placeholder")}
          onChange={(e) => setTrackingInput(Number(e.currentTarget.value))}
          onKeyDown={(e) =>
            e.key === "Enter" && trackingInput
              ? () => goToTransaction(trackingInput)
              : null
          }
          className="flex flex-row w-1/3 justify-center  placeholder-gray-400/70 ltr:rounded-l-md rtl:rounded-r-md border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 "
        />
        <button
          className="bg-red-600 w-10 items-center flex justify-center rtl:rounded-l-md ltr:rounded-r-md"
          onClick={() => trackingInput && goToTransaction(trackingInput)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
      <img
        src="https://bosta.co/211acba433dca873bf3c6d79b31d53ed.png"
        className="w-full absolute bottom-0"
      />
    </div>
  );
}

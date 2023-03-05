import clsx from "clsx";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { recordToArabic } from "../utilities/mapping-api-to-arabic";

const Step = ({
  icon,
  state,
  stopFlag,
}: {
  icon: React.ReactElement;
  state: string;
  stopFlag: boolean;
}) => {
  return (
    <li
      className={clsx(
        "flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b  after:border-4 after:inline-block ",
        state === "DELIVERED"
          ? "after:border-green-600"
          : stopFlag === true
          ? "after:border-gray-500"
          : "after:border-yellow-400"
      )}
    >
      {icon}
    </li>
  );
};

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function TrackerCard() {
  const shipment = useSelector((state: RootState) => state.shipment);
  const date = new Date(shipment.shipment.CurrentStatus?.timestamp);
  const { t, lang } = useTranslation("tracking");
  const router = useRouter();
  let stopFlag = false;
  const color =
    shipment.shipment.CurrentStatus?.state === "DELIVERED"
      ? "bg-green-600"
      : "bg-yellow-600";
  return (
    <div className="border-2 border-gray-100 mt-10">
      <div className="flex flex-col space-y-2 md:flex-row justify-between border-b-2 p-8 border-gray-100">
        <div className="flex flex-col ">
          <h1>
            {t("shipmentNumber") + " " + shipment.shipment.TrackingNumber}
          </h1>
          <h2 className="text-green-600 font-bold text-2xl">
            {shipment.shipment.CurrentStatus?.state
              ? shipment.shipment.CurrentStatus?.state.slice(0, 1) +
                shipment.shipment.CurrentStatus?.state
                  .slice(1)
                  .replaceAll("_", " ")
                  .toLowerCase()
              : ""}
          </h2>
        </div>
        <div className="flex flex-col">
          <h1>{t("lastUpdate")}</h1>
          <h2 className="text-black-600 font-semibold text-xl">
            {days[date.getDay()] +
              " " +
              date.toLocaleDateString("en-us") +
              " " +
              "at" +
              " " +
              date.toLocaleTimeString()}
          </h2>
        </div>
        <div className="flex flex-col">
          <h1>{t("merchantName")}</h1>
          <h2 className="text-black-600 font-semibold text-xl">
            {shipment.shipment.provider}
          </h2>
        </div>
        <div className="flex flex-col">
          <h1>{t("timeToBeDelivered")}</h1>
          <h2 className="text-black-600 font-semibold text-xl">
            {new Date(
              shipment.shipment.CurrentStatus?.timestamp
            ).toLocaleString("en-us", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </h2>
        </div>
      </div>

      <ol className="flex items-center w-full p-8">
        {shipment.shipment.TransitEvents?.map((transit: any, index: number) => {
          if (
            shipment.shipment.CurrentStatus?.state ===
            shipment.shipment.TransitEvents[index - 1]?.state
          ) {
            stopFlag = true;
          }
          if (
            index === shipment.shipment.TransitEvents?.length - 1 &&
            shipment.shipment.CurrentStatus?.state === "DELIVERED"
          ) {
            return (
              <div key={transit.state + transit.timestamp}>
                <span
                  className={clsx(
                    "flex items-center justify-center w-10 h-10  rounded-full lg:h-12 lg:w-12  shrink-0",
                    shipment.shipment.CurrentStatus?.state === "DELIVERED"
                      ? "bg-green-600"
                      : stopFlag === true
                      ? "bg-gray-500"
                      : "bg-yellow-400"
                  )}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 lg:w-6 lg:h-6 dark:text-gray-100"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
                <h6
                  className="text-xs  mt-4 font-semibold"
                  style={{
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 1,
                  }}
                >
                  {lang === "ar"
                    ? recordToArabic[transit.state]
                    : transit.state.slice(0, 1) +
                      transit.state.slice(1).replaceAll("_", " ").toLowerCase()}
                </h6>
              </div>
            );
          } else {
            return (
              <div className="w-full">
                <Step
                  key={transit.state + transit.timestamp}
                  stopFlag={
                    shipment.shipment.CurrentStatus?.state ===
                    shipment.shipment.TransitEvents[index]?.state
                  }
                  state={shipment.shipment.CurrentStatus?.state}
                  icon={
                    <div>
                      <span
                        className={clsx(
                          "flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0",
                          shipment.shipment.CurrentStatus?.state === "DELIVERED"
                            ? "bg-green-600"
                            : stopFlag === true
                            ? "bg-gray-500"
                            : "bg-yellow-400"
                        )}
                      >
                        <svg
                          aria-hidden="true"
                          className={clsx("w-5 h-5 lg:w-6 lg:h-6 text-white")}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                    </div>
                  }
                />
                <h6
                  className="text-xs mt-4 font-semibold"
                  style={{
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 1,
                  }}
                >
                  {lang === "ar"
                    ? recordToArabic[transit.state]
                    : transit.state.slice(0, 1) +
                      transit.state.slice(1).replaceAll("_", " ").toLowerCase()}
                </h6>
              </div>
            );
          }
        })}
        {shipment.shipment.CurrentStatus?.state !== "DELIVERED" && (
          <div>
            <span
              className={clsx(
                "flex items-center justify-center w-10 h-10  rounded-full lg:h-12 lg:w-12  shrink-0",
                "bg-gray-500"
              )}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 lg:w-6 lg:h-6 dark:text-gray-100"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
            <h6
              className="text-xs  mt-4 font-semibold"
              style={{
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
              }}
            >
              {lang === "ar" ? recordToArabic["DELIVERED"] : "Delivered"}
            </h6>
          </div>
        )}
      </ol>
    </div>
  );
}

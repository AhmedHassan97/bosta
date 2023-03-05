import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function SideCards() {
  const shipment = useSelector((state: RootState) => state.shipment);

  const { t, lang } = useTranslation("tracking");
  return (
    <div className=" px-2 lg:w-5/12 w-full ">
      <div className="flex  overflow-hidden bg-white rounded-lg shadow-md  mt-14 max-h-40">
        <div className="w-1/3 h-full">
          <img
            src="https://darvideo.tv/wp-content/uploads/2021/09/Demo-animated-video.jpg"
            className="h-full object-contain"
          />
        </div>

        <div className="w-2/3 p-4 md:p-4 ">
          <h1 className="mt-2 text-sm text-black-600 font-medium w-full mb-4">
            {t("message")}
          </h1>
          <button className="bg-red-600 rounded-md text-white mx-ato text-sm w-full h-10">
            {t("report")}
          </button>
        </div>
      </div>
      <h1 className="text-sm text-black-600 font-medium w-full my-4">
        {t("address")}
      </h1>
      <div className="flex overflow-hidden bg-white rounded-lg shadow-md w-full max-h-40">
        <div className="w-2/3 p-4 md:p-4 ">
          <h1 className="mt-2 text-sm text-black-600 font-medium w-full mb-4">
            {lang === "en" ? "no address" : "لا يوجد عنوان"}
          </h1>
        </div>
      </div>
    </div>
  );
}

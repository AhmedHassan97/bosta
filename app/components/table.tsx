import { RootState } from "@/app/redux/store";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { recordToArabic } from "../utilities/mapping-api-to-arabic";

export default function Table() {
  const shipment = useSelector((state: RootState) => state.shipment);

  const { t, lang } = useTranslation("tracking");

  return (
    <section className=" px-4 lg:w-7/12 w-full ">
      <h2 className="text-lg font-medium text-gray-800 ">{t("tableTitle")}</h2>

      <p className="mt-1 text-sm text-gray-500 "></p>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200  md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 ">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 "
                    >
                      <button className="flex items-center gap-x-3 focus:outline-none">
                        {t("branch")}
                      </button>
                    </th>

                    <th
                      scope="col"
                      className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                    >
                      {t("date")}
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                    >
                      {t("time")}
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                    >
                      {t("details")}
                    </th>

                    <th scope="col" className="relative py-3.5 px-4">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {shipment.shipment.TransitEvents?.map((transitEvent: any) => (
                    <tr key={transitEvent.state + transitEvent.timestamp}>
                      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                        <div>
                          <h2 className="font-medium text-gray-800">
                            {transitEvent.hub ?? "-"}
                          </h2>
                        </div>
                      </td>
                      <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                        <h2 className="font-medium text-gray-800">
                          {new Date(transitEvent.timestamp).toLocaleDateString(
                            "en-us"
                          )}
                        </h2>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <h2 className="font-medium text-gray-800">
                          {new Date(
                            transitEvent.timestamp
                          ).toLocaleTimeString()}
                        </h2>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div>
                          <h4 className="text-gray-700 ">
                            {lang === "ar"
                              ? recordToArabic[transitEvent.state]
                              : transitEvent.state.slice(0, 1) +
                                transitEvent.state
                                  .slice(1)
                                  .replaceAll("_", " ")
                                  .toLowerCase()}
                          </h4>
                          <p className="text-red-500 ">{transitEvent.reason}</p>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

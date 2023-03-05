import SideCards from "@/app/components/side-cards";
import Table from "@/app/components/table";
import TrackerCard from "@/app/components/tracker-card";
import { RootState } from "@/app/redux/store";
import { fetchShipment } from "@/app/utilities/fetch-shipment";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setShipment,
  removeShipment,
} from "../../app/redux/reducers/shipments";

export default function Shipment() {
  const shipment = useSelector((state: RootState) => state.shipment);
  const [error, setError] = React.useState<boolean>(false);
  const router = useRouter();
  const { transactionId } = router.query;

  React.useEffect(() => {
    const getShipment = async () => {
      try {
        const shipmentResult = await fetchShipment(Number(transactionId));
        const data = await shipmentResult.data;

        dispatch(setShipment(data));
      } catch (e) {
        setError(true);
      }
    };
    getShipment();

    return () => {
      dispatch(removeShipment());
    };
  }, [transactionId]);
  const dispatch = useDispatch();

  const { t, lang } = useTranslation("tracking");

  if (error) {
    return (
      <img
        src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg"
        className="mx-auto mt-10"
      />
    );
  }
  return (
    <div className="max-w-7xl mx-auto">
      <TrackerCard />
      <div className="flex lg:flex-row flex-col">
        <Table />
        <SideCards />
      </div>
    </div>
  );
}

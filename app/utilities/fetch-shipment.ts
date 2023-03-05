import axios from "axios";

export const fetchShipment = async (transactionNumber: number) => {
  return await axios.get(
    `https://tracking.bosta.co/shipments/track/${transactionNumber}`
  );
};

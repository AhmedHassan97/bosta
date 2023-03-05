import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ShipmentState {
  shipment: any;
}

const initialState: ShipmentState = {
  shipment: {},
};

export const shipmentSlice = createSlice({
  name: "shipment",
  initialState,
  reducers: {
    setShipment: (state, action: PayloadAction<any>) => {
      state.shipment = action.payload;
    },
    removeShipment: (state) => {
      state.shipment = {};
    },
  },
});

export const { setShipment, removeShipment } = shipmentSlice.actions;

export default shipmentSlice.reducer;

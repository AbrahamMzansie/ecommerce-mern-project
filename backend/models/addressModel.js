import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    latitude: {
      type: String,
      required: false,
    },
    longtitude: {
      type: String,
      required: false,
    },
    ipAddress: {
      type: String,
      required: false,
    },
    userAgent: {
        type: String,
        required: false,
      },
  },
  {
    timestamps: true,
  }
);

const Address = mongoose.model("Address", addressSchema);

export default Address;

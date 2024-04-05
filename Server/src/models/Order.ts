import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
    },
    chaza: {
      ref: "Chaza",
      type: String,
      required: true,
    },
    products: [
      {
        product: {
          ref: "Product",
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    state: {
      type: Number,
      required: true,
      default: 0,
    },
    time_to_delivery: {
      type: Date,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;

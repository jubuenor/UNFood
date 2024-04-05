import mongoose from "mongoose";

const chazaSchema = new mongoose.Schema(
  {
    owner: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    products: [
      {
        ref: "Product",
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    score: {
      type: Number,
      default: -1,
    },
    image: {
      type: String,
      requried: true,
    },
    payment_method: [
      {
        type: Number,
      },
    ],
    comments: [
      {
        user: {
          type: String,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        calification: {
          type: Number,
          required: true,
        },
        date: {
          type: String,
          required: true,
        },
      },
    ],
    qr: {
      type: String,
      required: false,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Chaza = mongoose.model("Chaza", chazaSchema);

export default Chaza;

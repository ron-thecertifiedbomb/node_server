import mongoose from "mongoose"; // Use ES module import for mongoose

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imageUrls: [
    {
      type: String,
      required: true,
    },
  ],
  specifications: {
    processor: {
      type: String,
      required: true,
    },
    graphics: {
      type: String,
      required: true,
    },
    storage: {
      type: String,
      required: true,
    },
    resolution: {
      type: String,
      required: true,
    },
    maxFrameRate: {
      type: String,
      required: true,
    },
  },
  includedItems: [
    {
      type: String,
      required: true,
    },
  ],
  availableColors: [
    {
      type: String,
      required: true,
    },
  ],
});

const Product = mongoose.model("Product", productSchema);

export default Product; // Use export default

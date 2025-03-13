import Product from "../../model/Product.js" // Use ES module import for Product model

// Controller to add a new product
export const createProduct = async (req, res) => {
  const {
    productName,
    manufacturer,
    price,
    quantity,
    category,
    imageUrls,
    specifications,
    includedItems,
    availableColors,
  } = req.body;

  // Validate if all required fields are provided
  if (
    !productName ||
    !manufacturer ||
    !price ||
    !quantity ||
    !category ||
    !imageUrls ||
    !specifications ||
    !includedItems ||
    !availableColors
  ) {
    return res.status(400).json({
      message: "Please provide all required fields",
    });
  }

  try {
    // Check if a product with the same name already exists
    const existingProduct = await Product.findOne({ productName });


    if (existingProduct) {
      // Log the error message before returning it
      console.log(
        `[${new Date().toISOString()}] ERROR: Product with the name "${productName}" already exists.`
      );
      return res
        .status(400)
        .json({ message: "Product with the same name already exists" });
    }

    // Create a new product instance
    const newProduct = new Product({
      productName,
      manufacturer,
      price,
      quantity,
      category,
      imageUrls,
      specifications,
      includedItems,
      availableColors,
    });

    // Save the product to the database
    await newProduct.save();

    // Respond with success
    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    // Handle any error that occurs during saving
    console.error("Error adding product:", error);
    res.status(500).json({
      message: "Error adding product",
      error: error.message,
    });
  }
};

// Controller to get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};


// Controller to get a product by ID
export const getProductById = async (req, res) => {
  const { id } = req.params;  // id passed in the route params

  try {
    // Find product by the MongoDB _id field, which is expected by default
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      message: "Error fetching product",
      error: error.message,
    });
  }
};

import ProductModel from "../models/Product.js";
import fs from "fs"
export const createproduct = async (req, res) => {
  console.log(req);
  try {
    let images = req?.files?.map((item) => {
      return item.filename;
    });

    const prodata = await ProductModel.create({
      name: req.body.name,
      description: req.body.description,
      qty: req.body.qty,
      price: req.body.price,
      images: images,
      active: req.body.active,
      departmentId: req.body.departmentId,
    });
    if (prodata) res.status(201).send({ message: "Product Created" });
    else res.status(404).send({ message: "unable to create product" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};
export const getProductsbyDepId = async (req, res) => {
  try {
    const prodaata = await ProductModel.find({
      departmentId: req.query.departmentId,
    }).populate({
      path: "departmentId",
      populate: [{ path: "uniId" }],
    });
    if (prodaata) res.status(201).send({ prodaata });
    else res.status(404).send({ message: "Product nhi mile😢" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};
export const UpdateProduct = async (req, res) => {
    try {
      const staticpath = "D:\\React JS\\ecomm_react\\server\\uploadProducts\\"; // Absolute path for product images directory
  
      // Get existing product data
      const existingData = await ProductModel.findById(req.body.id);
      if (!existingData) {
        return res.status(404).send({ message: "Product not found!" });
      }
  
      // Delete previous images if they exist
      if (existingData.images && existingData.images.length > 0) {
        existingData.images.forEach((image) => {
          fs.unlink(staticpath + image, (err) => {
            if (err) {
              console.error("Error deleting file:", err);
            } else {
              console.log("Previous image deleted successfully");
            }
          });
        });
      }
  
      // Extract filenames of new images
      let images = req?.files?.map((item) => {
        return item.filename;
      });
  
      // Update product data
      const updatedData = await ProductModel.findByIdAndUpdate(
        req.body.id,
        {
          name: req.body.name,
          description: req.body.description,
          qty: req.body.qty,
          price: req.body.price,
          images: images,
          department: req.body.departmentId,
        },
        { new: true }
      );
  
      if (updatedData) {
        res.status(200).send({ message: "Product updated!" });
      } else {
        res.status(404).send({ message: "Unable to update product!" });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };
export const DeleteProduct = async (req, res) => {
  try {
    const productData = await ProductModel.deleteOne({
      _id: req.body.id,
    });
    if (productData.deletedCount == 1)
      res.status(201).send({ message: "Product Deleted" });
    else res.status(404).send({ message: "unable to Delete product" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};
export const UpdateProductQty = async (req, res) => {
  try {
    let productInDb = await ProductModel.findOne({
      _id: req.body.id,
    });
    let active = true; //default status is active
    if (productInDb.qty - req?.body?.qty <= 0) {
      active = false;
    }
    let productData = await ProductModel.findByIdAndUpdate(
      {
        _id: req.body.id,
      },
      {
        active: active,
        qty: productInDb?.qty - req.body.qty,
      }
    );
    if (productData) res.status(200).send({ message: "Product qty updated" });
    else res.status(404).send({ message: "unable to update product qty" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};
export const GetProductDetails = async (req, res) => {
  try {
    const proDetails = await ProductModel.findOne({
      _id: req.query.id,
    }).populate({ path: "departmentId", populate: [{ path: "uniId" }] });
    res.status(200).send({ proDetails });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

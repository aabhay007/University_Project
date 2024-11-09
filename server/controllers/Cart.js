import ShoppingCartModel from "../models/ShoppingCart.js";

export const additemsincart = async (req, res) => {
  try {
    const { user, product, count } = req.body;

    // Parse count as a number
    const itemCount = parseInt(count, 10);

    // Check if the product already exists in the user's cart
    const existingCartItem = await ShoppingCartModel.findOne({
      user: user,
      product: product,
    });

    if (existingCartItem) {
      // If the product exists, increment the count
      existingCartItem.count = parseInt(existingCartItem.count, 10) + itemCount;
      await existingCartItem.save();
      res.status(201).send({ message: "Product count in the cart updated" });
    } else {
      // If the product doesn't exist, create a new cart entry
      const newCartItem = await ShoppingCartModel.create({
        count: itemCount, // Use parsed count
        product: product,
        user: user,
      });
      if (newCartItem) {
        res.status(201).send({ message: "Product added to the cart" });
      } else {
        res.status(404).send({ message: "Unable to add product to the cart" });
      }
    }
  } catch (error) {
    console.error("Error in CreateCart:", error);
    res.status(500).send({ error: error?.message });
  }
};

export const getCartItems = async (req, res) => {
  try {
    const userId=req.query.userId;
    const cartItems = await ShoppingCartModel.find({
      user: userId,
    })
      .populate({ path: "user", select: "email streetaddress city state phoneno" })
      .populate({
        path: "product",
        select: "name price qty description images",
      })
      .exec();
    res.status(200).send({ cartItems });
  } catch (e) {
    console.error("Error in GetCartItems:", e);
    res.status(404).send({ error: e?.message });
  }
};
export const removeCartItems = async (req, res) => {
  try {
    const itemsToRemove = req.body.id;
    const remove = await ShoppingCartModel.findByIdAndDelete(itemsToRemove);
    if (remove) {
      res.status(200).send({ message: "Items Removed!" });
    } else {
      res.status(404).send({ error: "Unable to remove items!" });
    }
  } catch (e) {
    console.log(e);
    res.status(404).send({ error: "Some Errors Occours!!" });
  }
};

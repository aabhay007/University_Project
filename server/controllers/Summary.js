import orderHeaderModel from "../models/OrderHeader.js";

export const createSummary = async (req, res) => {
  try {
    // Fetch orders from the database
    const summaryData = await orderHeaderModel.create({
      user: req.body.userId,
      streetaddress: req.body.streetaddress,
      city: req.body.city,
      state: req.body.state,
      phoneno: req.body.phoneno,
      orderTotal: req.body.orderTotal,
      shippingDate: req.body.shippingDate,
      trackingNumber: req.body.trackingNumber,
      orderStatus: req.body.orderStatus,
      paymentStatus: req.body.paymentStatus,
      paymentDate: req.body.paymentDate,
    });
    if(summaryData) res.status(200).send({message:"Successfully created!"});
    else res.status(404).send({message:"Unable to create!"});
  } catch (err) {
    console.error("Error in createSummary:", err);
    res.status(500).json({ error: err.message });
  }
};

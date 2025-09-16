import Order from "../models/order.js";
import Product from "../models/product.js";

export async function createOrder(req, res) {
  //get user information
  //add current user name if not provide
  //orderId generate
  //stock check
  //create order object

  if (req.user == null) {
    res.status(403).json({
      message: "You are not authorized to create an order, please logion first",
    });
    return;
  }

  const orderInfo = req.body;

  if (orderInfo.name == null) {
    orderInfo.name = req.user.firstName + " " + req.user.lastName;
  }

  let orderId = "CBC00001";

  const lastOrder = await Order.find().sort({ date: -1 }).limit(1);
  if (lastOrder.length > 0) {
    const lastOrderId = lastOrder[0].orderId;
    //extract number from lastOrderId
    const lastOrderNumberString = lastOrderId.replace("CBC", "");
    const lastOrderNumber = parseInt(lastOrderNumberString);
    const newOrderNumber = lastOrderNumber + 1;
    const newOrderNumberString = String(newOrderNumber).padStart(5, "0");
    orderId = "CBC" + newOrderNumberString;
  }

  try {
    let total = 0;
    let labelledTotal = 0;
    const products = [];

     for(let i=0; i< orderInfo.products.length; i++){
        const item = await Product.findOne({ productId: orderInfo.products[i].productId });
       if(item == null){
           res.status(400).json({
            message: `Product with ID ${orderInfo.products[i].productId} not found`
          });
            return;
       }
       if(item.isAvailable == false){
        res.status(400).json({
            message: `Product with ID ${orderInfo.products[i].productId} is not available`
          });
            return;
       }
       products[i] = {
        productInfo : {
            productId : item.productId,
            name : item.name,
            altNames : item.altNames,
            description : item.description,
            images : item.images,
            labelledPrice : item.labelledPrice,
            price : item.price
        },
        quantity : orderInfo.products[i].qty
       }
       total += (item.price * orderInfo.products[i].qty);
       labelledTotal += (item.labelledPrice * orderInfo.products[i].qty);
     }



    const order = new Order({
      orderId: orderId,
      email: req.user.email,
      name: orderInfo.name,
      address: orderInfo.address,
      labelledTotal: labelledTotal,
      total: total,
      phone: orderInfo.phone,
      products: products 
    });

    const createdOrder = await order.save();
    res.status(201).json({ message: "Order created successfully", order });
    order: createdOrder;
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating order", error: err.message });
  }
}

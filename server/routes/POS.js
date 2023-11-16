const express = require("express");
const { ObjectId } = require('mongodb');
const router = express.Router();

//for the new transaction in history collection
router.put("/", (req, res) => {

    // console.log(req.body);
    const productId = req.body.DbId;
    // console.log(req.body);
    const quantity = -(req.body.quantity);
    // console.log(quantity);

    // //first changes in the products collection
    // //then add to trancsacton history

    db.collection("Products")
    .updateOne({
        _id: new ObjectId(productId),
    },{
        $inc: {
            Quantity: quantity,
        }
    }).then((data) => {
        res.json({message: "subtracted"});
    })
})

router.post("/", (req, res) => {

    const Receipt = req.body;
    console.log(Receipt);

    db.collection("Transactions_Histories")
    .insertOne(Receipt)
    .then((data) => {
        res.json({message: "Transaction added"});
    })
})

module.exports = router;
const express = require("express");
const { ObjectId } = require('mongodb');
const router = express.Router();

router.get("/", (req, res) => {
    db.collection("Transactions_Histories")
    .find()
    .toArray()
    .then(async (transactions) => {

        const RequiredInfo = await Promise.all(transactions.map(async (t) => {
            const listOfItems = await Promise.all(t.ListOfItems.map(async (item) => {
                const product = await db.collection("Products")
                .findOne({
                    _id: new ObjectId(item.DbId),
                })

                return {
                    Name: product ? product.Name : "Doesnt Exist",
                    UnitPrice: product.Price,
                    Quantity: item.Quantity,
                }
            }))

            const date = new Date(t.DateTime);
            const extractedDate = date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
            });
            const extractedTime = date.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
            });

            return {
                ListOfItems: listOfItems,
                Date: extractedDate,
                Time: extractedTime,
                Total: t.Total,
            }
        }));
        res.json(RequiredInfo);
    })
})

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

router.get("/revenue", (req, res) => {

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const today = new Date();

    const Dates = [];

    for (let date = new Date(weekAgo); date <= today; date.setDate(date.getDate() + 1)) 
    {
        Dates.push(new Date(date).toLocaleDateString("en-US"));
    }

    db.collection("Transactions_Histories")
    .find({ DateTime: { $gte: weekAgo.toISOString() } })
    .toArray()
    .then(data => {
        const dateCountMap = {};

        Dates.forEach(date => {
            dateCountMap[date] = 0;
        });

        let Revenue = 0;

        data.forEach(transaction => {
            const transactionDate = new Date(transaction.DateTime).toLocaleDateString("en-US");
            dateCountMap[transactionDate]++;
            Revenue += transaction.Total;
        });

        const result = Object.keys(dateCountMap).map(date => ({
            x: date,
            y: dateCountMap[date],
        }));

        const RequiredInfo = {
            Revenue: Revenue,
            result: result,
        }
    
        res.json(RequiredInfo);
    })
})

router.get("/:date", (req, res) => {

    const date = new Date(req.params.date);
    date.setDate(date.getDate()+1);

    const startOfDay = new Date(date)
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(date)
    endOfDay.setUTCHours(24, 59, 59, 999);

    db.collection("Transactions_Histories")
    .find({ DateTime: {
        $gte: startOfDay.toISOString(),
        $lte: endOfDay.toISOString(),
    }}).toArray()
    .then((data) => {

        const noOfTransactions = data.length;
        const netProfit = ( data.length !== 0 ) ? data.reduce((total, t1) => total + t1.Total, 0) : 0;
        console.log(noOfTransactions, netProfit);

        const RequiredInfo = {
            Transactions: noOfTransactions,
            NetProfit: netProfit,
        }

        res.json(RequiredInfo);
    })

})

module.exports = router;
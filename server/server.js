const express = require('express');
const bodyParser = require('body-parser');
const {connectToDb, getDb} = require('./db');
const { ObjectId } = require('mongodb');
// const { ObjectId, Binary } = require('mongodb');
// const mime = require("mime-types")
// const fs = require("fs");

const app = express();
app.use(express.json());

// const cron = require("node-cron");

let db;

// Multer Code

// const multer = require("multer");
// const path = require("path");

// const storage = multer.memoryStorage();

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "ProfilePics")
//     },
//     filename: (req, file, cb) => {
//         console.log(req.file);
//         cb(null, file.originalname);
//     }
// })

// const upload = multer({storage: storage})

// End Multer Code 


// Updating Attendance

app.post("/verifyCredentials", (req,res) => {
    db.collection("Users_Information")
    .findOne({"Name": req.body.name , "Password":req.body.password})
    .then(
        (member) => {
            console.log(member);
                if (member === null)
                {
                    res.json({User:"none"})
                }
                else if (member.Role === "admin")
                {
                    res.json({User:"admin"})
                }
                else if (member.Role === "manager")
                {
                    res.json({User:"manager"})
                }
                else if (member.Role === "staff")
                {
                    res.json({User:"staff",
                              storeId: member.StoreId,
                            })
                }
        }
    )
})

app.get("/getAdminNavLinks", (req, res) => {
    db.collection("Stores")
    .find()
    .toArray()
    .then(
        (Stores) => {
            res.json(Stores);
        }
    )
})

app.post("/getWorkersInfo", (req, res) => {
    const Id = req.body.id;
    db.collection("Users_Information")
    .find({ StoreId: Id})
    .toArray()
    .then(data => {
        const RequiredInfo = data.map((user) => ({
            Id: user._id.toString(),
            Name: user.Name,
            Role: user.Role,
        }))
        res.json(RequiredInfo);
    });
})

app.post("/getProductsInfo", (req, res) => {
    const Id = req.body.id;

    // const RequiredInfo = [];

    db.collection("Stores")
    .findOne({ _id: new ObjectId(Id) })
    // .toArray()
    .then(data => {

        const processProducts = async (data) => {
            const arr = [];

            for (const product of data.Products)
            {
                const thing = await db.collection("Products")
                    .findOne({ _id: new ObjectId(product.id) });

                const info = {
                    Id: product.id,
                    Name: thing.Name,
                    Desc: thing.Desc,
                    Price: thing.Price,
                    Quantity: product.quantity,
                }
                arr.push(info);
            }
            return arr;
        }

        processProducts(data)
        .then(arr => {
            console.log(arr);
            res.json(arr);
        });
        
    })
})

app.post("/getTransactionsHistory", async (req,res) => {
    
    const Id = req.body.id;
    // console.log(Id);

    const TransactionArray = await db.collection("Transactions_Histories")
                            .find({ StoreId: Id })
                            .toArray();
                            // .then((data) => {return data});

    console.log("Obtained all the stores transactions",TransactionArray);

    const RequiredInfo = await Promise.all(TransactionArray.map(async (transaction) => {
        const Products = transaction.Products;

        const RequiredProductInfo = await Promise.all(Products.map(async (product) => {
            
            const FullProductInfo = await db.collection("Products")
                                        .findOne({ _id: new ObjectId(product.Id) });

            console.log("Obtained Full Product Info: ",FullProductInfo)
            
            const Info = {
                Name: FullProductInfo.Name,
                Quantity: product.Quantity,
            }

            return Info;
        }))

        console.log("Obtained the requied info of each product in each transaction",RequiredProductInfo);

        const Info = {
            Products: RequiredProductInfo,
            DateTime: transaction.DateTime,
            TotalPrice: transaction.TotalPrice,
        }

        return Info;

    }))

    // const gettingProductName = async (productId) => {
    //     const Product = await db.collection("Products")
    //                             .findOne({ _id: new ObjectId(productId)})
    //     return Product.Name;
    // }

    // const TransactionsArray = await db.collection("Transactions_Histories")
    //                                 .find({ StoreId: Id })
    //                                 .toArray();
    
    // console.log(TransactionsArray);

    // const RequiredInfo = TransactionsArray.map(async (transactionIndex) => {

    //     //gets the product name of each product in a single transaction index
    //     const ProductsArray = transactionIndex.Products.map(async (product) => {
    //         // const productName = await gettingProductName(product.Id);
    //         const productName = product.Id;
    //         const ProductInfo = {
    //             Name: productName,
    //             Quantity: product.Quantity,
    //         }
    //         return ProductInfo;
    //     })

    //     const info = {
    //         Products: ProductsArray,
    //         DateTime: transactionIndex.DateTime,
    //         TotalPrice: transactionIndex.TotalPrice,
    //     }

    //     // const info = {
    //     //     ProductName: productName,
    //     //     Quantity: historyIndex.Quanitty,
    //     //     DateTime: historyIndex.DateTime,
    //     //     TotalPrice: historyIndex.TotalPrice,
    //     // }
    //     return info;
    // });

    console.log("Got all the info we need",RequiredInfo);
    res.json(RequiredInfo);

})

app.post("/getDeliveryHistory", async (req,res) => {

    const Id = req.body.StoreId;

    const AllDeliveries = await db.collection("Delivery_Histories")
    .find({ _id: new ObjectId(Id) })
    .toArray()

    const RequiredInfo = AllDeliveries.map(async (delivery) => {
        const Supplier = await db.collection("Suppliers_Information")
        .findOne({ _id: new ObjectId(delivery.SupplierId) })

        const Product = await db.collection("Products")
        .findOne({ _id: new ObjectId(deliver.ProductId) })

        return {
            SupplierName: Supplier.Name,
            ProductName: Product.Name,
            Price: delivery.Price,
            Date: delivery.Date,
        }
    })

    res.json(RequiredInfo);

    // res.json([{
    //     SupplierName: "Nothing",
    //     ProductName: "Nothing",
    //     Price: 0
    // }])
})

app.put("/ModifyProducts", (req, res) => {
    // console.log(req.body);
    // const item = req.body;
    const storeId = req.body.StoreId;
    const productId = req.body.Product.Id;
    const newQuantity = req.body.Product.Quantity;

    // console.log(storeId, productId, newQuantity);

    db.collection("Stores")
    .updateOne(
        { 
            _id: new ObjectId(storeId),
            "Products.id": productId,
        },
        {
            $set: {
                "Products.$.quantity": newQuantity,
            }
        }    
    )
    .then(res.json({msg: "Modified"}))

})

app.post("/addTransaction", (req,res) => {
    console.log(req.body);
    db.collection("Transactions_Histories")
    .insertOne(req.body)
    .then(res.json({msg: "added"}))
})

connectToDb((err) => {
    if (!err)
    {
        app.listen(5000, () => {
            console.log("app listening on port 5000");
            // db.collection("Transactions_")
        })
        db = getDb();
    }
});
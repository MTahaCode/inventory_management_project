// const { ObjectId, Binary } = require('mongodb');
// const mime = require("mime-types")
// const fs = require("fs");
const express = require('express');
const {connectToDb, getDb} = require('./db');
const { ObjectId } = require('mongodb');
const cron = require("node-cron");
const app = express();
app.use(express.json());
global.db;

const userRoutes = require("./routes/User");

app.use('/User', userRoutes);

// const userRoute = require("./routes/User")
// app.use("/User", userRoute);

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

// app.post("/verifyCredentials", (req,res) => {
//     db.collection("Users_Information")
//     .findOne({"Name": req.body.name , "Password":req.body.password})
//     .then(
//         (member) => {
//             console.log(member);
//                 if (member === null)
//                 {
//                     res.json({User:"none"})
//                 }
//                 else if (member.Role === "admin")
//                 {
//                     res.json({User:"admin"})
//                 }
//                 else if (member.Role === "manager")
//                 {
//                     res.json({
//                         User:"manager",
//                         StoreId: member.StoreId,
//                     })
//                 }
//                 else if (member.Role === "staff")
//                 {
//                     res.json({User:"staff",
//                               storeId: member.StoreId,
//                             })
//                 }
//         }
//     )
// })

// app.get("/getAdminNavLinks", (req, res) => {
//     db.collection("Stores")
//     .find()
//     .toArray()
//     .then(
//         (Stores) => {
//             res.json(Stores);
//         }
//     )
// })

// app.post("/getWorkersInfo", (req, res) => {
//     const Id = req.body.id;
//     db.collection("Users_Information")
//     .find({ StoreId: Id})
//     .toArray()
//     .then(data => {
//         const RequiredInfo = data.map((user) => ({
//             Id: user._id.toString(),
//             Name: user.Name,
//             Role: user.Role,
//         }))
//         res.json(RequiredInfo);
//     });
// })

// app.post("/getProductsInfo", (req, res) => {
//     const Id = req.body.id;

//     // const RequiredInfo = [];

//     db.collection("Stores")
//     .findOne({ _id: new ObjectId(Id) })
//     // .toArray()
//     .then(data => {

//         const processProducts = async (data) => {
//             const arr = [];

//             for (const product of data.Products)
//             {
//                 const thing = await db.collection("Products")
//                     .findOne({ _id: new ObjectId(product.id) });

//                 const info = {
//                     Id: product.id,
//                     Name: thing.Name,
//                     Desc: thing.Desc,
//                     Price: thing.Price,
//                     Quantity: product.quantity,
//                 }
//                 arr.push(info);
//             }
//             return arr;
//         }

//         processProducts(data)
//         .then(arr => {
//             console.log(arr);
//             res.json(arr);
//         });
        
//     })
// })

// app.get("/getAllProducts", (req, res) => {
//     db.collection("Products")
//     .find()
//     .toArray()
//     .then((data) => {

//         const RequiredInfo = data.map((product) => {
//             return {
//                 Id: product._id.toString(),
//                 Name: product.Name,
//                 Desc: product.Desc,
//                 Price: product.Price,
//                 Quantity: 0,
//             }
//         })
//         res.json(RequiredInfo);
//         // console.log(RequiredInfo);
//     });
// })

// app.post("/getTransactionsHistory", async (req,res) => {
    
//     const Id = req.body.id;
//     // console.log(Id);

//     const TransactionArray = await db.collection("Transactions_Histories")
//                             .find({ StoreId: Id })
//                             .toArray();
//                             // .then((data) => {return data});

//     console.log("Obtained all the stores transactions",TransactionArray);

//     const RequiredInfo = await Promise.all(TransactionArray.map(async (transaction) => {
//         const Products = transaction.Products;

//         const RequiredProductInfo = await Promise.all(Products.map(async (product) => {
            
//             const FullProductInfo = await db.collection("Products")
//                                         .findOne({ _id: new ObjectId(product.Id) });

//             console.log("Obtained Full Product Info: ",FullProductInfo)
            
//             const Info = {
//                 Name: FullProductInfo.Name,
//                 Quantity: product.Quantity,
//             }

//             return Info;
//         }))

//         console.log("Obtained the requied info of each product in each transaction",RequiredProductInfo);

//         const Info = {
//             Products: RequiredProductInfo,
//             DateTime: transaction.DateTime,
//             TotalPrice: transaction.TotalPrice,
//         }

//         return Info;

//     }))

//     console.log("Got all the info we need",RequiredInfo);
//     res.json(RequiredInfo);

// })

// app.post("/getDeliveryHistory", async (req,res) => {

//     const StoreId = req.body.id;

//     // const Store = await db.collection("Stores").findOne({ _id: new ObjectId(StoreId) });

//     // const StoreName = Store.Name;

//     // console.log(StoreName);

//     const AllDeliveries = await db.collection("Delivery_Histories").find({ StoreId: StoreId }).toArray();

//     const RequiredInfo = await Promise.all(AllDeliveries.map(async (delivery) => {
//         const ProductName = (await db.collection("Products").findOne({ _id: new ObjectId(delivery.ProductId) })).Name;
//         const SupplierName = (await db.collection("Suppliers_Information").findOne({ _id: new ObjectId(delivery.SupplierId) })).Name;
//         return {
//             SupplierName: SupplierName,
//             ProductName: ProductName,
//             Price: delivery.TotalPrice,
//             // Date: delivery.Date,
//         }
//     }));

//     res.json(RequiredInfo);

//     // const RequiredInfo = AllDeliveries.map(async (delivery) => {
//     //     const Supplier = await db.collection("Suppliers_Information")
//     //     .findOne({ _id: new ObjectId(delivery.SupplierId) })

//     //     const Product = await db.collection("Products")
//     //     .findOne({ _id: new ObjectId(deliver.ProductId) })

//     //     return {
//     //         SupplierName: Supplier.Name,
//     //         ProductName: Product.Name,
//     //         Price: delivery.Price,
//     //         Date: delivery.Date,
//     //     }
//     // })

//     // res.json(RequiredInfo);

//     // res.json([{
//     //     SupplierName: "Nothing",
//     //     ProductName: "Nothing",
//     //     Price: 0
//     // }])
// })

// app.put("/ModifyProducts", (req, res) => {
//     // console.log(req.body);
//     // const item = req.body;
//     const storeId = req.body.StoreId;
//     const productId = req.body.Product.Id;
//     const newQuantity = req.body.Product.Quantity;

//     // console.log(storeId, productId, newQuantity);

//     db.collection("Stores")
//     .updateOne(
//         { 
//             _id: new ObjectId(storeId),
//             "Products.id": productId,
//         },
//         {
//             $set: {
//                 "Products.$.quantity": newQuantity,
//             }
//         }    
//     )
//     .then(res.json({msg: "Modified"}))

// })

// app.delete("/deleteProductFromStore", (req, res) => {
//     db.collection("Stores").updateOne(
//         { 
//             _id: new ObjectId(req.body.StoreId), 
//         },
//         {
//             $pull: {
//                 Products: {
//                     id: req.body.ProductId,
//                 }
//             },
//         }
//     ).then(res.json({msg: "It is deleted"}))
// })

// app.post("/addProductToStore" ,(req, res) => {
//     db.collection("Stores").updateOne(
//         { 
//             _id: new ObjectId(req.body.StoreId), 
//         },
//         {
//             $push: {
//                 Products: {
//                     id: req.body.ProductId,
//                     quantity: 0,
//                 }
//             },
//         }
//     ).then(res.json({msg: "It is deleted"}))
// })

// app.post("/addTransaction", (req,res) => {
//     console.log(req.body);
//     db.collection("Transactions_Histories")
//     .insertOne(req.body)
//     .then(res.json({msg: "added"}))
// })

// app.get("/GetDeliveryRequests", (req, res) => {
//     db.collection("Delivery_Requests")
//     .find()
//     .toArray()
//     .then(async (data) => {
//         const RequiredInfo = await Promise.all(data.map(async (request) => {
//                                 const StoreName = (await db.collection("Stores").findOne({ _id: new ObjectId(request.StoreId) })).Name;
//                                 const ProductName = (await db.collection("Products").findOne({ _id: new ObjectId(request.ProductId) })).Name;
//                                 const info = {
//                                     RequestId: request._id.toString(),
//                                     StoreId: request.StoreId,
//                                     StoreName: StoreName,
//                                     ProductId: request.ProductId,
//                                     ProductName: ProductName,
//                                 }
//                                 return info
//                             }));
//         res.json(RequiredInfo);
//         // console.log(RequiredInfo);
//     })
//     console.log("sent")
//     // res.json([{
//     //     StoreId: "hello",
//     //     StoreName: "world",
//     //     ProductId: "whats",
//     //     ProductName: "popping",
//     // }])
// })

// app.post("/AcceptRequest", async (req, res) => {
//     const Id = req.body.id;

//     const Request = await db.collection("Delivery_Requests").findOne({ _id: new ObjectId(Id) })

//     db.collection("Stores")
//     .updateOne(
//         { 
//             _id: new ObjectId(Request.StoreId),
//             "Products.id" : Request.ProductId
//         },
//         {
//             $inc: {
//                 "Products.$.quantity": 500,
//             }
//         }
//     ).then(async (data) => {

//         const Product = await db.collection("Products").findOne({ _id: new ObjectId(Request.ProductId) })

//         const HistoryIndex = {
//             StoreId: Request.StoreId,
//             ProductId: Request.ProductId,
//             TotalPrice: (Product.Price * 500),
//             SupplierId: Product.Supplier[0],
//         }
//         db.collection("Delivery_Histories")
//         .insertOne(HistoryIndex)
//         .then(
//             db.collection("Delivery_Requests").deleteOne({ _id: new ObjectId(Id) })
//             .then(
//                 res.json({ msg: "Done"})
//             )
//         )
//     });

// })

// app.post("/RejectRequest", async (req, res) => {
//     const Id = req.body.id;

//     db.collection("Delivery_Requests").deleteOne({ _id: new ObjectId(Id) })
//     .then(
//         res.json({ msg: "Done"})
//     )

// })

// app.delete("/RemoveProductRecord", (req, res) => {
//     db.collection("Stores").updateMany(
//         {
//             // "Products.id" : req.body.ProductId,
//         },
//         {
//             $pull: {
//                 Products: {
//                     id: req.body.ProductId,
//                 }
//             }
//         }
//     ).then(
//         db.collection("Products").deleteOne({ _id: new ObjectId(req.body.ProductId) })
//         .then(res.json({msg: "Record is deleted"}))
//     )
// })

// app.post("/AdminAddProduct", async (req, res) => {
    
//     const SupplierId = (await db.collection("Suppliers_Information").findOne())._id.toString();

//     console.log(SupplierId);

//     db.collection("Products")
//     .insertOne({
//         Name: req.body.ProductName,
//         Desc: req.body.Desc,
//         Price: req.body.Price,
//         Supplier: [SupplierId],
//     }).then(res.json({ msg: "New Product Added" }));
    
// })

// app.post("/AdminAddStore", (req, res) => {
//     db.collection("Stores").insertOne({
//         Name: req.body.StoreName,
//         Location: req.body.Location,
//         Workers: [],
//         Products: [],
//     }).then(res.json({msg: "New Store Added"}))
// })

// app.delete("/RemoveStoreRecord", (req, res) => {
//     db.collection("Transactions_Histories").deleteMany({
//         StoreId: req.body.StoreId,
//     }).then(
//         db.collection("Delivery_Histories").deleteMany({
//             StoreId: req.body.StoreId,
//         }).then(
//             db.collection("Users_Information").deleteMany({
//                 StoreId: req.body.StoreId
//             }).then(
//                 db.collection("Stores").deleteOne({
//                     _id: new ObjectId(req.body.StoreId),
//                 }).then(res.json({msg: "All store Record has been deleted"}))
//             )
//         )
//     )
// })



// app.post("/getTotals", async (req,res) => {
    
//     const dateFromReq = new Date(req.body.Date); // assuming req.body.Date is in 'yyyy-mm-dd' format
//     const startOfReqDate = new Date(dateFromReq.setHours(0,0,0,0));
//     const startOfNextDate = new Date(dateFromReq.setHours(24,0,0,0));

//     const AllSales = await db.collection("Transactions_Histories").find({
//         dateTime: {
//             $gte: startOfReqDate,
//             $lt: startOfNextDate
//         }
//     }).forEach((sale) => sale.TotalPrice);

//     console.log(AllSales);

//     // const TodaySales = AllSales.filter((sale) => {
//     //     const reqDate = new Date(dateFromReq)
    //     reqDate.setHours(0, 0, 0, 0);

    //     const saleDate = new Date(sale.DateTime);
    //     saleDate.setHours(0, 0, 0, 0);

    //     if (reqDate === saleDate)
    //     {
    //         return 1;
    //     }
    //     return 0;
    // })

    // console.log(TodaySales);

    // const AllDeliveries = await db.collection("Delivery_Histories").find().toArray();
    
    // const TotalSales = AllSales.reduce((total, sale) => total+sale, 0);

    // const TotalPurchases = AllSales.length;
    // const TotalDeliveries = AllDeliveries.reduce((total, sale) => total+sale,0);
    // // .find({
    // //     dateTime: {
    // //         $gte: startOfReqDate,
    // //         $lt: startOfNextDate
    // //     }
    // // }).toArray();

    // const RequiredInfo = {
    //     totalSales: TotalSales,
    //     totalPurchases: TotalPurchases,
    //     totalDeliveries: TotalDeliveries,
    // }

    // console.log(RequiredInfo);
    // res.json( {
    //     totalSales: TotalSales,
    //     totalPurchases: TotalPurchases,
    //     totalDeliveries: TotalDeliveries,
    // });

// })

connectToDb((err) => {
    if (!err)
    {
        app.listen(5000, () => {
            console.log("app listening on port 5000");
            cron.schedule("*/5 * * * * *", () => {
                // UpdateRequestsRecord();
            })
        })
        db = getDb();
    }
});



// const UpdateRequestsRecord = async () => {
//     console.log("croning");
//     const ConcernedStores = await db.collection("Stores")
//     .find({
//         Products: {
//             $elemMatch: {
//                 quantity: { $lt: 10}
//             }
//         }
//     }).toArray()

//     ConcernedStores.map((store => {
//         const Id = store._id.toString();

//         const Products = store.Products;

//         const ConcernedProducts = Products.filter((product) => {
//             if (product.quantity <=10)
//             {
//                 return 1;
//             }
//             return 0;
//         }).map((product) => {

//             const request = {
//                 StoreId: Id,
//                 ProductId: product.id,
//             }
//             return request;
//         })

//         ConcernedProducts.map(async (request) => {
//             const Exists = await db.collection("Delivery_Requests")
//             .findOne(request);

//             if (Exists === null)
//             {
//                 db.collection("Delivery_Requests")
//                 .insertOne(request);
//             }
//         })

//     }))
// }
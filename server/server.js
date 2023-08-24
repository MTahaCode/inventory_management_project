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
                    res.json({User:"staff"})
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

connectToDb((err) => {
    if (!err)
    {
        app.listen(5000, () => {
            console.log("app listening on port 5000");
            // cron.schedule("*/10 * * * * *", () => {
            //     UpdateAttendanceRecord();
            // })
        })
        db = getDb();
    }
});
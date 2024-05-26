const express = require("express");
const { ObjectId } = require('mongodb');
const router = express.Router();

//crud
//create read update delete

router.put("/", (req, res) => {

    const ProductId = req.body.DbId;
    const { name, desc, price, measuring, quantity } = req.body;
    console.log(name, desc, price, measuring, quantity);

    db.collection("Products")
    .updateOne({
        _id: new ObjectId(ProductId),
    },{
        $set: {
            Name: name,
            Desc: desc,
            Price: price,
            Measuring_Method: measuring,
            Quantity: quantity,

            // Password: req.body.password,
            // Email: req.body.email,
            // Role: req.body.role,
            // Desc
        }
    }).then((data) => {
        res.json({message: "It is done"});
    })
})

router.delete("/:id", (req, res) => {

    const ProductId = req.params.id;
    // console.log(ProductId);

    db.collection("Products").deleteOne({ _id: new ObjectId(ProductId) })
    .then(
        res.json({ message: "Deleted" })
    )
})

router.post('/', async (req, res) => {

    // console.log(req.body);

    const { name, desc, price, measuring, quantity } = req.body;

    console.log(name, desc, price, measuring, quantity);

    const AlreadyExists = await db.collection("Products").findOne({ Name: name, });

    if (AlreadyExists)
    {
        res.json({ message: 'Product with this name already exists' })
    }
    else
    {
        db.collection("Products").insertOne({
            Name: name,
            Desc : desc,
            Price: price,
            Measuring_Method: measuring,
            Quantity: quantity,
        }).then((data) => 
            res.json({ message: 'Product Added Successfully' })
        )
    }

    //extracting from req
    // const { name, password, email, store, role } = req.body;
    // //checking if the user exists
    // const existingUser = await db.collection("Users_Information").findOne({ Name: name });

    // if (existingUser) {
    // return res.status(400).json({ message: 'User with this name already exists' });
    // }
    // else{
    // //get the store id
    // const storeId = (await db.collection("Stores").findOne({ Name: store }))._id.toString();
    
    // const id = await db.collection("Users_Information")
    //     .insertOne({
    //         Name: name,
    //         Password: password,
    //         Email: email,
    //         StoreId: storeId,
    //         Role: role,
    //     })
    // const UserId = id.insertedId.toString();

    // db.collection("Stores").updateOne(
    //     {
    //         _id: new ObjectId(storeId),
    //     },
    //     {
    //         $push: {
    //             Workers: UserId,
    //         }
    //     }
    // )
    // .then(
    //     res.json({ message: 'User registered successfully' })
    // )
    // }
});

router.get("/", (req, res) => {
    db.collection("Products")
    .find()
    .toArray()
    .then((data) =>
    {
        const RequiredData = data.map((product) => {

            // const Head = 10;
            // consst h = Head.toString

            // console.log(product);
            return {
                DbId: product._id.toString(),
                name: product.Name,
                desc: product.Desc,
                price: product.Price,
                measuring: product.Measuring_Method,
                quantity: product.Quantity,
            }
        })
        // console.log(RequiredData);
        res.json(RequiredData);
    })
    // .forEach(
        
    // )
})

module.exports = router;
const express = require("express");
const { ObjectId } = require('mongodb');
const router = express.Router();

router.put("/", (req, res) => {

    const userId = req.body.DbId;

    db.collection("Users_Information")
    .updateOne({
        _id: new ObjectId(userId),
    },{
        $set: {
            Name: req.body.name,
            Password: req.body.password,
            Email: req.body.email,
            Role: req.body.role,
        }
    }).then((data) => {
        res.json({message: "It is done"});
    })
})

router.get("/", async (req, res) => {

    const store = "First Store";

    const storeId = (await db.collection("Stores").findOne({ Name: store }))._id.toString();

    db.collection("Users_Information")
    .find({ StoreId: storeId})
    .toArray()
    .then(data => {
        const RequiredInfo = data.map((user) => ({
            DbId: user._id.toString(),
            Name: user.Name,
            Password: user.Password,
            Role: user.Role,
            Store: store,
            Email: user.Email,
        }))
        res.json(RequiredInfo);
    });
})

router.delete("/:id", (req, res) => {

    const UserId = req.params.id;
    console.log(UserId);

    db.collection("Users_Information").deleteOne({ _id: new ObjectId(UserId) })
    .then(
        res.json({ message: "Deleted" })
    )
})

router.post('/', async (req, res) => {
    //extracting from req
    const { name, password, email, store, role } = req.body;
    //checking if the user exists
    const existingUser = await db.collection("Users_Information").findOne({ Name: name });

    if (existingUser) {
    return res.status(400).json({ message: 'User with this name already exists' });
    }
    else{
    //get the store id
    const storeId = (await db.collection("Stores").findOne({ Name: store }))._id.toString();
    
    const id = await db.collection("Users_Information")
        .insertOne({
            Name: name,
            Password: password,
            Email: email,
            StoreId: storeId,
            Role: role,
        })
    const UserId = id.insertedId.toString();

    db.collection("Stores").updateOne(
        {
            _id: new ObjectId(storeId),
        },
        {
            $push: {
                Workers: UserId,
            }
        }
    )
    .then(
        res.json({ message: 'User registered successfully' })
    )
    }
});

router.post("/login", (req, res) => {
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
                    res.json({
                        User:"manager",
                        // StoreId: member.StoreId,
                    })
                }
                else if (member.Role === "staff")
                {
                    res.json({User:"staff",
                            //   storeId: member.StoreId,
                            })
                }
        }
    )
})

module.exports = router;
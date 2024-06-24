const express = require('express')
const Category = require('./Models/CategoryModel')
const sequelize = require('./config/database')
const bodyParser = require('body-parser')
const router = express.Router()
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('./Models/UserModel')
const Service = require('./Models/ServiceModel')
const authMiddleware = require("./middleware/auth")
const app = express()
app.use(bodyParser.json())
const port = 4000
sequelize.sync()
app.get('/', authMiddleware, (req, res) => res.send('Hello World!'))
app.post("/add-category", authMiddleware, async (req, res) => {
    try {

        const { Category_Name } = req.body;
        const category = await Category.create({ Category_Name });
        res.status(201).json(category);
    } catch (error) {
        console.log(error, "error")
    }
})

app.get('/getCategory', authMiddleware, async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(201).json(categories);
    } catch (error) {
        console.log(error, "error")
    }
})
app.delete('/category/:id', authMiddleware,  async (req, res) => {
    try {
        const categories = await Category.findByPk(req.params.id);
        if (categories) {
            await categories.destroy()
            res.status(201).json("deleted successfully");
        }
        else {
            res.status(404).json("caegory not found");
        }
    } catch (error) {
        console.log(error, "error")
    }
})
app.put('/category/:id', authMiddleware, async (req, res) => {
    try {
        const categories = await Category.findByPk(req.params.id);
        const { Category_Name } = req.body;
        if (categories) {
            categories.Category_Name = Category_Name;
            await categories.save();
            res.status(201).json("Updated successfully");
        }
        else {
            res.status(404).json("caegory not found");
        }
    } catch (error) {
        console.log(error, "error")
    }
})

///    Authentication System

app.post("/register",  async (req, res) => {
    try {

        const { email, password, User_Name } = req.body;
        const hashedPasswod = await bcrypt.hash(password, 10);
        const newUser = await User.create({ User_Name, password: hashedPasswod, email })
        res.status(201).json(newUser, "user Created Successfully");
    } catch (error) {
        console.log(error, "error")
    }
})
const secret = "Adnan"
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id }, secret, { expiresIn: "1h" })
            res.status(200).json({message:"Login Successfully",token});
        }
        else{
            res.status(500).json({message:"Wrong Email or password"});
        }
    } catch (error) {
        console.log(error, "error")
        res.status(500).json("Login not  Successfully");
    }
})


app.get('/getUsers', async (req, res) => {
    try {
        const Users = await User.findAll();
        res.status(201).json(Users);
    } catch (error) {
        console.log(error, "error")
    }
})


///Service Part data

app.post("/Add-service", authMiddleware,async (req, res) => {
    try {

        const { Service_Name, ServiceType, Price_Options, Category_id } = req.body;
        const category = await Category.findByPk(Category_id);
        if (category) {
            const NewService = await Service.create({
                Service_Name, ServiceType, Price_Options, Category_id
            })
            res.status(201).json("New Service is created Successfully");
        }
    } catch (error) {
        console.log(error, "error")
    }
})

app.get('/get-service',authMiddleware, async (req, res) => {
    try {
        const getService = await Service.findAll();
        res.status(201).json(getService);
    } catch (error) {
        console.log(error, "error")
    }
})

app.delete('/service/:id',authMiddleware, async (req, res) => {
    try {
        const services = await Service.findByPk(req.params.id);
        if (services) {
            await services.destroy()
            res.status(201).json("deleted successfully");
        }
        else {
            res.status(404).json("caegory not found");
        }
    } catch (error) {
        console.log(error, "error")
    }
})
app.put('/service/:id',authMiddleware, async (req, res) => {
    try {
        const services = await Service.findByPk(req.params.id);
        const { Service_Name, ServiceType, Price_Options} = req.body;
        if (services) {
            services.Service_Name = Service_Name;
            services.ServiceType = ServiceType;
            services.Price_Options = Price_Options;
            await services.save();
            res.status(201).json("Updated successfully");
        }
        else {
            res.status(404).json("Service not found");
        }
    } catch (error) {
        console.log(error, "error")
    }
})

app.listen(port, () => console.log(`Server listening on port ${port}!`));
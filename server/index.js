import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

// import routes here ...
import userRouter from "./routes/user.js";
const app = express();

app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors());

// use app.use here for other routes such as users, surveys, ...
app.use("/user", userRouter);

const MONGO_URI = 'mongodb+srv://teen_design_lab_admin:f78PJtF8UtX3PNRH@cluster0.ycfhu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => app.listen(PORT, () => console.log(`Server Running on Port: https://localhost:${PORT}`)))
        .catch((error) => console.log(`${error}! was unable to connect to mongodb`));

mongoose.set('useFindAndModify', false);
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');


const app = express();

mongoose.connect(process.env.MONGODB_STRING);
mongoose.connection.once("open", () => console.log("We're connected to the cloud database"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);


if(require.main === module){
    app.listen(process.env.PORT || 3000, () => console.log(`Server running at port ${process.env.PORT || 3000}`));
}

module.exports = {app,mongoose};
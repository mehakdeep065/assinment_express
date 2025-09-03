const mongoose = require('mongoose');

const connectDb = async ()=>{
    try{
       await mongoose.connect(process.env.MONGO_DB);
       console.log("conected successfully");
       
    }
    catch{
        console.log('connection failed');
        process.exit(1);
        
    }
}
module.exports = connectDb;
import {connect} from 'mongoose';
require('dotenv').config();


const connectToMongo =async () => {
  try{
    await connect(process.env.MONGO_URI,{
      dbName:"paymentGateway"
    });
    console.log("database connect successfully");

    
  }catch(error)
  {
    console.log(error)
  }
}

export default connectToMongo

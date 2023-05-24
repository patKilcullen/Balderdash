import app from "./server.js"
import mongodb from "mongodb"
import dotend from "dotenv"
dotend.config()


import RoundsDAO from "./dao/roundsDAO.js"
import RestaurantsDAO from "./dao/restaurantsDAO.js"

const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 4000

// MongoClient.connect(
//     process.env.Balderdash_NOSQL_URI,
//     {
//         // poolSize: 50,
//         wtimeout: 2500,
//         // useNewUrlParse: true
//     }
// ).catch(err=>{
//     console.error(err.stack)
//     process.exit()
// })
// .then(async client =>{
//     console.log("linstening on port" + client.connection)
// // HEREEEEE
// await RoundsDAO.injectDB(client)
// await RestaurantsDAO.injectDB(client)
//     app.listen(port, ()=>{
//         console.log("linstening on port" + port)
//     })
// })















// import { MongoClient, ServerApiVersion } from 'mongodb';
// const uri = "mongodb+srv://patrickjkilcullen:Throbbing1349!@balderdash0.0i6ywmq.mongodb.net/rounds?retryWrites=true&w=majority";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
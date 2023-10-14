const {MongoClient} =require('mongodb');
const url ='mongodb://localhost:27017';
const connection = new MongoClient(url);
const database="Ecom";





async function getdata(){
    let result = await connection.connect();
    let db=result.db(database);
    let collection =db.collection("collection.Credentials");
    let response=await collection.find({}).toArray();
    console.log(response);
}

getdata();
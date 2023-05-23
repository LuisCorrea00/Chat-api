const { MongoClient, ObjectId } = require("mongodb");

let singleton;

async function connect(){
    if (singleton) return singleton;

    const client = new MongoClient(process.env.DB_HOST);
    await client.connect();

    singleton = client.db(process.env.DB_DATABASE);
    return singleton;
}

async function findAll (collection) {
    const db = await connect();
    return db.collection(collection).find().toArray();
}

let findOne = async (collection, _id)=>{
    const db = await connect();
    let obj = await db.collection(collection).find({'_id':new ObjectId(_id)}).toArray();
    if(obj)
        return obk[0];
    return false;
}

async function insertOne(collection, object){
    const db = await connect();
    return db.collection(collection).insertOne(object)
}

let updateOne = async (collection, object, param)=>{
    const db = await connect();
    let result = await db.collection(collection).updateOne(param, { $set: object});
    return result;
}

module.exports = {findAll,insertOne,findOne, updateOne}
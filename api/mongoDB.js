const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kiartichai:94IHyNUlUXII6MFt@cluster0.3vhe9.mongodb.net/test?authSource=admin&replicaSet=atlas-k1km9w-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"
const client = new MongoClient(uri);

export const con = client.connect();
    
export default client;

main().catch(console.error);

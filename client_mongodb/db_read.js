const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://allanbismarckdev:abss123456789@cluster0.0e3c3sn.mongodb.net/?retryWrites=true&w=majority";

var readPage = async function() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();

        const dbo = client.db('pages');
        const collection = 'data_pages';

        // await dbo.collection(collection).insertOne(data);
        var data = await dbo.collection(collection).find().toArray();
        return data;
    } finally {
        await client.close();
    }
}

module.exports = readPage;
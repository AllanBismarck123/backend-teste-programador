const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://allanbismarckdev:abss123456789@cluster0.0e3c3sn.mongodb.net/?retryWrites=true&w=majority";

var savePage = async function(data) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();

        const dbo = client.db('pages');
        const colecao = 'data_pages';

        await dbo.collection(colecao).insertOne(data);
        console.log('page registered with success');
    } finally {
        await client.close();
    }
}

module.exports = savePage;
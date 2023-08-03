const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://allanbismarckdev:abss123456789@cluster0.0e3c3sn.mongodb.net/?retryWrites=true&w=majority";

var deletePage = async function (id) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();

        const dbo = client.db('pages');
        const colecao = 'data_pages';

        const filter = { _id: new ObjectId(id) };

        const result = await dbo.collection(colecao).deleteOne(filter)
        console.log('page deleted with success');

        return result.deletedCount === 1;
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        await client.close();
    } 
}

module.exports = deletePage;
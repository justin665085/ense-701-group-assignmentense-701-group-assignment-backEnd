import { VercelRequest, VercelResponse } from '@vercel/node';
import { MongoClient } from 'mongodb'
const uri = "mongodb+srv://dbUser:dbUser@cluster0.kwhhqy3.mongodb.net/?retryWrites=true&w=majority";
module.exports = async (req: VercelRequest, res: VercelResponse) => {
    // @ts-ignore
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    // @ts-ignore
    const db = await client.db('ENSE');
    const col = db.collection("ReviewedDocument");

    // Create a new document
    let Document = {
        "authors": req.body.authors,
        "doi": req.body.doi,
        "jName": req.body.jName,
        "number": req.body.number,
        "pages": req.body.pages,
        "title": req.body.title,
        "volume": req.body.volume,
        "yop": req.body.yop
    }
    // Insert the document into the specified collection
    const p = await col.insertOne(Document);
    // Find and return the document
    const filter = {"title": req.body.title};
    const deletedDocument = await db.collection("newAddDocument").deleteMany(filter);
    console.log("Document analyzed:\n" + JSON.stringify(deletedDocument));
    res.status(200).json(deletedDocument);
}

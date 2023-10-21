import { VercelRequest, VercelResponse } from '@vercel/node';
import { MongoClient } from 'mongodb'
const uri = "mongodb+srv://dbUser:dbUser@cluster0.kwhhqy3.mongodb.net/?retryWrites=true&w=majority";
module.exports = async (req: VercelRequest, res: VercelResponse) => {
    // @ts-ignore
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    // @ts-ignore
    const db = await client.db('ENSE');
    const col = db.collection("newAddDocument");

    // Create a new document
    let personDocument = {
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
    const p = await col.insertOne(personDocument);
    // Find and return the document
    const filter = {"title": req.body.title};
    const document = await col.findOne(filter);
    console.log("Document found:\n" + JSON.stringify(document));
    res.status(200).json(document);
}

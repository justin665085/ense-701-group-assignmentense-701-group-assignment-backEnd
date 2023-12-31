import { VercelRequest, VercelResponse } from '@vercel/node';
import { MongoClient } from 'mongodb'
const uri = "mongodb+srv://dbUser:dbUser@cluster0.kwhhqy3.mongodb.net/?retryWrites=true&w=majority";
module.exports = async (req: VercelRequest, res: VercelResponse) => {
    console.log(req.method)
    if (req.method === "OPTIONS") {
        res.status(200)
    }
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
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
    res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
    res.setHeader("Expires", "0"); // Proxies.
    // res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(document);
}

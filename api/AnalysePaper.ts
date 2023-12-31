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
    const col = db.collection("AnalyzedDocument");
    const decline= req.body.decline

    if (decline) {
        const filter = {"title": req.body.title};
        const deletedDocument = await db.collection("ReviewedDocument").deleteMany(filter);
        console.log("Document analyzed:\n" + JSON.stringify(deletedDocument));
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
        res.setHeader("Expires", "0"); // Proxies.
        // res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).json(deletedDocument);
    }
    else {
        // Create a new document
        let Document = {
            "title": req.body.title,
            "authors": req.body.authors,
            "yop": req.body.yop,
            "jName": req.body.jName,
            "SEpractice":req.body.SEpractice,
            "claim": req.body.claim,
            "ROE": req.body.ROE,
            "TOR":req.body.TOR,
            "TOP": req.body.TOP,
        };
        // Insert the document into the specified collection
        const p = await col.insertOne(Document);
        // Find and return the document
        const filter = {"title": req.body.title};
        const deletedDocument = await db.collection("ReviewedDocument").deleteMany(filter);
        console.log("Document analyzed:\n" + JSON.stringify(deletedDocument));
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
        res.setHeader("Expires", "0"); // Proxies.
        // res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).json(deletedDocument);
    }


}

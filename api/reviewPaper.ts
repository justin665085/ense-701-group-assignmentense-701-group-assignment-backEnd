import { VercelRequest, VercelResponse } from '@vercel/node';
import { MongoClient } from 'mongodb'
const uri = "mongodb+srv://dbUser:dbUser@cluster0.kwhhqy3.mongodb.net/?retryWrites=true&w=majority";
module.exports = async (req: VercelRequest, res: VercelResponse) => {
    // @ts-ignore
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    // @ts-ignore
    const db = await client.db('ENSE');
    const col = db.collection("ReviewedDocument");

    const option = req.body?.opinion

    if (option === 0) {
        console.log(req.body.title);
        const filter = {"title": req.body.title};
        const deletedDocument = await db.collection("newAddDocument").deleteMany(filter);
        console.log("Document deleted:\n" + JSON.stringify(deletedDocument));
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
        res.setHeader("Expires", "0"); // Proxies.
        res.status(200).json(deletedDocument);
        return;
    }

    else {
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
        };
        // Insert the document into the specified collection
        const p = await col.insertOne(Document);
        // Find and return the document
        const filter = {"title": req.body.title};
        const deletedDocument = await db.collection("newAddDocument").deleteMany(filter);
        console.log("Document reviewed:\n" + JSON.stringify(deletedDocument));
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
        res.setHeader("Expires", "0"); // Proxies.
        res.status(200).json(Document);
    }


}

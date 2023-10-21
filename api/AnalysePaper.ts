import { VercelRequest, VercelResponse } from '@vercel/node';
import { MongoClient } from 'mongodb'
const uri = "mongodb+srv://dbUser:dbUser@cluster0.kwhhqy3.mongodb.net/?retryWrites=true&w=majority";
module.exports = async (req: VercelRequest, res: VercelResponse) => {
    // @ts-ignore
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    // @ts-ignore
    const db = await client.db('ENSE');
    const col = db.collection("AnalyzedDocument");

    // Create a new document
    let Document = {
        "title": req.body.title,
        "authors": req.body.authors,
        "year of publication": req.body.yop,
        "jName": req.body.jName,
        "SEpractice":req.body.SEpractice,
        "claim": req.body.claim,
        "result of evidence": req.body.ROE,
        "type of research":req.body.TOR,
        "type of participant": req.body.TOP,
    }
    // Insert the document into the specified collection
    const p = await col.insertOne(Document);
    // Find and return the document
    const filter = {"title": req.body.title};
    const deletedDocument = await db.collection("newAddDocument").deleteMany(filter);
    console.log("Document analyzed:\n" + JSON.stringify(deletedDocument));
    res.status(200).json(deletedDocument);
}

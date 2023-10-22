import { VercelRequest, VercelResponse } from '@vercel/node';
import { MongoClient } from 'mongodb'
const uri = "mongodb+srv://dbUser:dbUser@cluster0.kwhhqy3.mongodb.net/?retryWrites=true&w=majority";
module.exports = async (req: VercelRequest, res: VercelResponse) => {
    // @ts-ignore
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    // @ts-ignore
    const db = await client.db('ENSE');
    const col = db.collection("ReviewedDocument");

    const filter = {"year of publication": req.query.yop,
                    "SEpractice": req.query.SEpractice};

    const document = await col.find(filter).toArray();;
    console.log("Document found:\n" + JSON.stringify(document));
    res.status(200).json(document);
}

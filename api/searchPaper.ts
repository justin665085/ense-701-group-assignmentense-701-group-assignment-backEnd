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
    console.log("year")
    console.log(req.query.year)
    console.log("practice")
    console.log(req.query.practice)
    if(req.query.year.length===0&&req.query.practice.length===0){
        const document = await col.find().toArray();
        console.log("Document found:\n" + JSON.stringify(document));
        res.status(200).json(document);
    }
    else {
        if(req.query.year.length===0){
            const filter = { "SEpractice": req.query.practice.toString().trim() }
            const document = await col.find(filter).toArray();
            console.log("Document found:\n" + JSON.stringify(document));
            res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
            res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
            res.setHeader("Expires", "0"); // Proxies.
            res.status(200).json(document);
        }
        else if (req.query.practice.length===0) {
            const filter = { "yop": +req.query.year }
            const document = await col.find(filter).toArray();
            console.log("Document found:\n" + JSON.stringify(document));
            res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
            res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
            res.setHeader("Expires", "0"); // Proxies.
            res.status(200).json(document);
        }
        else {
            const filter = { "yop": +req.query.year,"SEpractice":req.query.practice.toString().trim()}
            const document = await col.find(filter).toArray();
            console.log("Document found:\n" + JSON.stringify(document));
            res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
            res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
            res.setHeader("Expires", "0"); // Proxies.
            res.status(200).json(document);
        }

    }

}

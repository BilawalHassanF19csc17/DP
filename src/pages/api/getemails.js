import * as fs from 'fs';

export default async function handler(req, res) {
    let files = await fs.promises.readdir('contactdata');
    let myFile;
    let myEmails = [];
    for (let index = 0; index < files.length; index++) {
        let singleMail = files[index];
        myFile = await fs.promises.readFile(('contactdata/'+singleMail), 'utf-8');
        myEmails.push(JSON.parse(myFile));
    }
    res.status(200).json(myEmails);
}
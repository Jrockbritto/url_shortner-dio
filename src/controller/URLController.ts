import { json, Request, Response } from "express";
import shortId from "shortid";
import { URLModel } from "../model/URL";
import { config } from "../config/Constants";


export class URLController {
    public async shorten(req: Request, res: Response): Promise<void> {
        // Ver se a URL já não exite
        const { originURL } = req.body
        const url = await URLModel.findOne({ originURL})
        if(url){
            res.json(url)
            return 
        }
        // Criar o hash pra essa url
        const hash = shortId.generate();
        const shortURL = `${config.API_URL}/${hash}`;
        const newURL = await URLModel.create({ hash, shortURL, originURL })

        //salva URL no banco
        // Retornar a URL que a gente salvou
        res.json(newURL);
    }

    public async redirect(req: Request, res: Response): Promise<void> {
        //pegar Hash da URL para
        const { hash } = req.params;
        //encontrar a URL original pelo hash
        const url = await URLModel.findOne({ hash });
        if(url){
            res.redirect(url.originURL);
            return;
        }
        res.status(400).json({ error: 'URL not found' });
    }
}
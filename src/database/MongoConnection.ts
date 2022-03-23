import mongoose from "mongoose";
import { config } from "../config/Constants";

export class MongoConnecion {
    public async connect(): Promise<void> {
        try {
            await mongoose.connect(config.MONGO_CONNECION, { useNewUrlParser: true, useUnifiedTopology: true });
            console.log('Database Connected');
        }
        catch (err) {
            console.error(err.message);
            process.exit(1);
        }
}
import mongoose from 'mongoose';
import { InventoryModel } from './models/inventory.model';

mongoose.set('debug', true);

//const OrderSchema = new mongoose.Schema({
    // la colonne est une relation (similaire est une clé étrangère)
    // item : {
    //     type : ObjectId,
    //     ref: 'inventory',
    // }
//});

async function initApp() {
    const connection = await mongoose.connect('mongodb://localhost/store', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex : true,
        useFindAndModify: false
    });

    // await InventoryModel.deleteMany({
    //     sku: 'instant-hair-regrowth'
    // });

    const inventories = await InventoryModel.find();
    console.log(inventories);

    // const shampooingDeSteph = await InventoryModel.findOneAndUpdate(
    //     {
    //         sku: 'instant-hair-regrowth'
    //     },
    //     {
    //         $inc: {
    //             instock: 1
    //         }
    //     },
    //     {
    //         new: true,
    //         upsert : true
    //     }
    // );

    const leShampoingDeStephane = await InventoryModel.findOne({
        sku: 'instant-hair-regrowth'
    });

    leShampoingDeStephane.instock++;
    await leShampoingDeStephane.save();
    

    // const newInventory = new InventoryModel({
    //     description: 'Shampoing pour Stéphane',
    //     sku: 1622
    // });

    // // try {
    // //     await newInventory.validate();
    // // }catch(e) {
    // //     console.log(chalk.red('Votre modèle n\'est pas valide : ', e.message));
    // // }

    // try {
    //     await newInventory.save();
    // }catch(e) {
    //     console.log(chalk.red('Votre modèle n\'est pas valide : ', e.message));
    // }

    console.log('Connected to mongo database', connection.version);
}

initApp().catch((e) => {
    console.log('Une erreur innatendue est survenue : ', e);
});
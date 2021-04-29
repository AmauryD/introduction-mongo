import mongoose from 'mongoose';
import { inspect } from 'util';
import { OrderModel } from './models/order.model';
require('./models/inventory.model');

mongoose.set('debug', true);


/* APP INIT Partie 1 
 - Ex find , update ,remove , save, ...
async function initApp() {
    const connection = await mongoose.connect("mongodb://localhost/store", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
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
        sku: "instant-hair-regrowth"
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

    console.log("Connected to mongo database", connection.version);
}
*/

/** APP INIT PART 2 */
async function initApp() {
    const connection = await mongoose.connect('mongodb://localhost/store', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });

    console.log('Connected to database', connection.version);

    const orders = await OrderModel.find().populate('inventoryItem');

    console.log(inspect(orders, false, null, true));
}

initApp().catch((e) => {
    console.log('Une erreur innatendue est survenue : ', e);
});

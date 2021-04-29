import mongoose from 'mongoose';

const InventorySchema = new mongoose.Schema(
    {
        sku: {
            type: String,
            unique: true,
            required: true
        },
        description: {
            type: String,
            default: 'A beautiful item',
            required: [true, 'Wesh insère ça']
        },
        instock: {
            type: mongoose.Schema.Types.Mixed,
            min: [0, 'On ne peut avoir des stocks négatifs'],
            max: 10000,
            // this : any => spécifique à Typescript, indique que votre contexte de fonction est de ce type
            required: function (this: any) {
                return this.instock > 10000;
            }
        },
        //
        type: {
            type: String,
            enum: ['bouffe', 'boisson', 'domestique']
        }
    },
    {
        collection: 'inventory'
    }
);

const InventoryModel = mongoose.model(
    'inventory',
    InventorySchema,
    'inventory'
);

export { InventoryModel };

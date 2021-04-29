import mongoose from 'mongoose';

// item -> inventory.sku
const OrderSchema = new mongoose.Schema(
    {
        item: {
            type: String
        },
        price: {
            type: Number
        },
        quantity: {
            type: Number
        }
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
);

OrderSchema.virtual('inventoryItem', {
    ref: 'inventory',
    localField : 'item',
    foreignField : 'sku',
    justOne: true
});

const OrderModel = mongoose.model('orders', OrderSchema, 'orders');

export { OrderModel };

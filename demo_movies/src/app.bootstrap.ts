import { createServer, IncomingMessage } from 'http';
import mongoose from 'mongoose';
import { OrderModel } from './model/order';


require('./model/order');
require('./model/inventory');

mongoose.set('debug', true);

async function initApp() {
    await mongoose.connect('mongodb://localhost/store', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const items = await OrderModel.findOne().populate('referencedItem');
}

initApp();
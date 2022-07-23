const { getItem, getItems, addItem, deleteItem, updateItem } = require('../controllers/itemsController');

//Item schema
const Item = {
    type: 'object',
    properties: {
        id: {type: 'string'},
        name: {type: 'string'}
    },
}

//Options for get all items (middleware) schema validation
const getItemsOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: Item,
            },
        },
    },
    handler: getItems
}

const getItemOpts = {
    schema: {
        response: {
            200: Item,
        },
    },
    handler: getItem,
}

const postItemsOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['name'],
            properties: {
                name: { type: 'string' },
            },
        },
        response: {
            201: Item,
        },
    },
    handler: addItem,
}    

const deleteItemOpts  = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: {type: 'string'}
                }
            },
        },
    },
    handler: deleteItem,
}

const updateItemOpts = {
    schema: {
        response: {
            200: Item,
        },
    },
    handler: updateItem,
}
   
//
function itemRoutes (fastify, options, done) {
    //get all items
    fastify.get('/items', getItemsOpts);
    //get single item
    fastify.get('/items/:id', getItemOpts);
    //add item
    fastify.post('/items', postItemsOpts);
    //delete item
    fastify.delete('/items/:id', deleteItemOpts);
    //update item
    fastify.put('/items/:id', updateItemOpts);

    done();

};

module.exports = itemRoutes;
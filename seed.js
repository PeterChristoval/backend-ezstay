const seeder = require('mongoose-seed')
const mongoose = require('mongoose')

seeder.connect('mongodb://localhost:27017/db_ezstay', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
}, function () {

    // Load Mongoose models
    seeder.loadModels([
        './models/Users'
    ]);

    // Clear specified collections
    seeder.clearModels(['Users'], function () {

        // Callback to populate DB once collections have been cleared
        seeder.populateModels(data, function () {
            seeder.disconnect()
        })

    })
})

const data = [
    {
        'model': 'Users',
        'documents': [
            {
                'username': 'admin',
                'password': 'tidakBolehTahu'
            },
        ]
    }
];
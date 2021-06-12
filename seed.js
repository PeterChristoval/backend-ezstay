const seeder = require('mongoose-seed')
const mongoose = require('mongoose')

seeder.connect('mongodb+srv://PeterChristoval:110603Peter@cluster0.ke91j.mongodb.net/db_ezstay?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
}, function () {

    // Load Mongoose models
    seeder.loadModels([
        './models/Users',
        './models/Gallery',
        './models/Building'
    ]);

    // Clear specified collections
    seeder.clearModels(['Users', 'Gallery', 'Building'], function () {

        // Callback to populate DB once collections have been cleared
        seeder.populateModels(data, function () {
            seeder.disconnect()
        })

    })
})

const data = [
    {
        'model': 'Gallery',
        'documents': [
            {
                'name': 'Glasses House',
                'place': 'KBP',
                'city': 'Bandung',
                'imageUrl': 'images/glasses.png',
                'rating': '4.7',
            },
        ]
    },
    {
        'model': 'Building',
        'documents': [
            {
                'name': 'High Fly',
                'price': 430,
                'place': 'Gambir',
                'city': 'Jakarta',
                'rating': '4.7',
                'description': '4.7',
                'imageUrl': 'images/high-fly.png',
            },
        ]
    },
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
const Building = require('../models/Building')
const Gallery = require('../models/Gallery')

module.exports = {
    landingPage: async (req, res) => {
        try {
            const recomendedBuilding = await Building.find()
            const gallery = await Gallery.find()
            res.status(200).json({
                recomendedBuilding,
                gallery
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Internal server error'})
        }
    },
}
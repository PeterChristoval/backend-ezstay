const Building = require('../models/Building')
const Gallery = require('../models/Gallery')
const User = require('../models/Users')
const path = require('path')
const fs = require('fs-extra')
const bcrypt = require('bcryptjs')
const Users = require('../models/Users')

module.exports = {
    viewSignin: async (req, res) => {
        try {
            const message = req.flash('alertMessage')
            const status = req.flash('alertStatus')
            const alert = {message, status}
            if (req.session.user == null || req.session.user == undefined) {
                res.render('index', { alert })
            } else {
                res.redirect('/admin/')
            }
        } catch (error) {
            res.redirect('/admin/signin')
        }
    },

    actionSignin: async (req, res) => {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if(!user) {
                req.flash('alertMessage', 'Wrong USERNAME!!')
                req.flash('alertStatus', 'danger')
                res.redirect('/admin/signin')
            }
            const passMatch = await bcrypt.compare(password, user.password)
            if(!passMatch) {
                req.flash('alertMessage', 'Wrong PASSWORD!!')
                req.flash('alertStatus', 'danger')
                res.redirect('/admin/signin')
            }

            req.session.user = {
                id: user._id,
                username: user.username
            }

            res.redirect('/admin/')

        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/signin')
        }
    },

    actionLogout: async (req, res) => {
        try {
            req.session.destroy()
            res.redirect('/admin/signin')
        } catch (error) {
            
        }
    },

    viewDashboard: async (req, res) => {
        const building = await Building.find()
        const gallery = await Gallery.find()
    res.render('Dashboard/dashboard', {title: 'EzStay | Dashboard', building, gallery, user: req.session.user})
    },

    viewBuilding: async (req, res) => {
        try {
            const message = req.flash('alertMessage')
            const status = req.flash('alertStatus')
            const alert = {message, status}
            const building = await Building.find()
            const user = await User.findOne()
            res.render('Building/building', { title: 'EzStay | Building', building, alert, user: req.session.user })
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', `danger`)
            res.redirect('/admin/building')
        }
    },

    addBuilding: async (req, res) => {
        try {
            const {
                name,
                price,
                place,
                city,
                rating,
                description
            } = req.body
            await Building.create({
                name,
                price,
                place,
                city,
                rating,
                description,
                imageUrl: `images/${req.file.filename}`
            })
            req.flash('alertMessage', 'Success add building')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/building')
        } catch (error) {
            if (error.message == "Cannot read property 'filename' of undefined") {
                req.flash('alertMessage', 'That is not images')
            } else {
                req.flash('alertMessage', `${error.message}`)
            }
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/building')
        }
    },

    editBuilding: async (req, res) => {
        try {
            const {
                id,
                name,
                price,
                place,
                city,
                rating,
                description
            } = req.body
            const building = await Building.findOne({_id: id})
            if (req.file == undefined) {
                building.name = name
                building.price = price
                building.place = place
                building.city = city
                building.rating = rating
                building.description = description
                await building.save()
                req.flash('alertMessage', 'Success update building')
                req.flash('alertStatus', 'success')
                res.redirect('/admin/building')
            } else {
                await fs.unlink(path.join(`public/${building.imageUrl}`))
                building.name = name
                building.price = price
                building.place = place
                building.city = city
                building.rating = rating
                building.description = description
                building.imageUrl = `images/${req.file.filename}`
                await building.save()
                req.flash('alertMessage', 'Success update building')
                req.flash('alertStatus', 'success')
                res.redirect('/admin/building')
            }
        } catch (error) {
            if (error.message == "Cannot read property 'filename' of undefined") {
                req.flash('alertMessage', 'That is not images')
            } else {
                req.flash('alertMessage', `${error.message}`)
            }
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/building')
        }
    },

    deleteBuilding: async (req, res) => {
        try {
            const { id } = req.params
            const building = await Building.findOne({ _id: id })
            await fs.unlink(path.join(`public/${building.imageUrl}`))
            await building.remove()
            req.flash('alertMessage', 'Success delete building')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/building')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/building')
        }
    },

    viewGallery: async (req, res) => {
        try {
            const message = req.flash('alertMessage')
            const status = req.flash('alertStatus')
            const alert = { message, status }
            const gallery = await Gallery.find()
            res.render('Gallery/gallery', { title: 'EzStay | Gallery', gallery, alert, user: req.session.user })
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', `danger`)
            res.redirect('/admin/gallery')
        }
    },
    
    addGallery: async (req, res) => {
        try {
            const {
                name,
                place,
                city,
                rating
            } = req.body
            await Gallery.create({
                name,
                place,
                city,
                rating,
                imageUrl: `images/${req.file.filename}`
            })
            req.flash('alertMessage', 'Success add gallery')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/gallery')
        } catch (error) {
            if (error.message == "Cannot read property 'filename' of undefined") {
                req.flash('alertMessage', 'That is not images')
            } else {
                req.flash('alertMessage', `${error.message}`)
            }
            req.flash('alertStatus', `danger`)
            res.redirect('/admin/gallery')
        }
    },

    editGallery: async (req, res) => {
        try {
            const {
                id,
                name,
                place,
                city,
                rating
            } = req.body
            const gallery = await Gallery.findOne({_id: id})
            if (req.file == undefined) {
                gallery.name = name
                gallery.place = place
                gallery.city = city
                gallery.rating = rating
                await gallery.save()
                req.flash('alertMessage', 'Success update gallery')
                req.flash('alertStatus', 'success')
                res.redirect('/admin/gallery')
            } else {
                await fs.unlink(path.join(`public/${gallery.imageUrl}`))
                gallery.name = name
                gallery.place = place
                gallery.city = city
                gallery.rating = rating
                gallery.imageUrl = `images/${req.file.filename}`
                await gallery.save()
                req.flash('alertMessage', 'Success update gallery')
                req.flash('alertStatus', 'success')
                res.redirect('/admin/gallery')
            }
        } catch (error) {
            if (error.message == "Cannot read property 'filename' of undefined") {
                req.flash('alertMessage', 'That is not images')
            } else {
                req.flash('alertMessage', `${error.message}`)
            }
            req.flash('alertStatus', `danger`)
            res.redirect('/admin/gallery')
        }
    },

    deleteGallery: async (req, res) => {
        try {
            const {id} = req.params
            const gallery = await Gallery.findOne({_id: id})
            await fs.unlink(path.join(`public/${gallery.imageUrl}`))
            await gallery.remove()
            req.flash('alertMessage', 'Success delete gallery')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/gallery')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/gallery')
        }
    },


}
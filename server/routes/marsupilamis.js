const express = require('express')
const Marsupilami = require('../models/Marsupilami')
const router = express.Router()




router.post('/signin', async (req,res) => {

    try {
		console.log(req.body.username)
        const mars = await Marsupilami.findOne({userName: req.body.userName})
		if(mars){
			res.send(mars)	
		}else{
			res.send("mars not found")
		}
        
        
    } catch (e) {
        res.status(400).send(e)
    }

})




// POST /api/marsupilami
// @desc Create a marsupilami's pofile
// @access Private

router.post('/', async (req,res) => {
    const marsupilami = new Marsupilami(req.body)
	console.log(req.body)
    try {
      
        await marsupilami.save()
        res.send(marsupilami)
        
    } catch (e) {
        res.status(400).send(e)
    }

})

// GET /api/marsupilami
// @desc Read all marsupilamis's pofile
// @access Private

router.get('/', async (req,res) => {

    try {
        const marsupilamis = await Marsupilami.find()
        res.send(marsupilamis)
    } catch (e) {
        res.status(500).send(e)
    }
   
})


// GET  /api/marsupilami/id
// @desc Read a marsupilami's pofile by id
// @access Private

router.get('/:id', async (req,res) => {
    const _id = req.params.id

    try {
        const marsupilami = await Marsupilami.findById(_id)
        if(!marsupilami) {
            return res.status(404).send('marsupilami does not exist !')
        }  
          res.send(marsupilami)
    }catch(e) {
        res.status(500).send(e)
    }

})

// GET  /api/marsupilami/id
// @desc Read a marsupilami's friends by id
// @access Private

router.get('/friends/:id', async (req,res) => {
    const _id = req.params.id

    try {
        const marsupilami = await Marsupilami.findById(_id).populate('friends')
        if(!marsupilami) {
            return res.status(404).send('marsupilami does not exist !')
        }  
          res.send(marsupilami.friends)
    }catch(e) {
        res.status(500).send(e)
    }

})
// PATCH /api/marsupilami/id
// @desc update a marsupilami's pofile by id
// @access Private

router.patch('/:id', async (req,res) => {
    const _id = req.params.id

    const updates = Object.keys(req.body)
    const allowedUpdates = ['fullName','age','family','race','food']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update) )

    if (!isValidOperation) {
        return res.status(400).send({ error : 'Invalid updates'})
    }

    try {
        const marsupilami = await Marsupilami.findByIdAndUpdate(_id, req.body, { new : true, runValidators: true})
        if(!marsupilami) {
            return res.status(404).send('marsupilami does not exist !')
        }  
          res.send(marsupilami)
    }catch(e) {
        res.status(400).send(e)
    }
})

// PATCH /api/marsupilami/addfriend/id
// @desc Add a friend
// @access Private


router.patch ('/addfriend/:id',  async (req, res) => {
    const _id = req.params.id

    const updates = Object.keys(req.body)
    const allowedUpdates = ['friend']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update) )

    if (!isValidOperation) {
        return res.status(400).send({ error : 'Invalid updates'})
    }
    
    try {
        const marsupilami = await Marsupilami.findById(_id)
        if(!marsupilami) {
            return res.status(404).send('marsupilami does not exist !')
        }    
    
        marsupilami.friends.push(req.body.friend)
        marsupilami.save()  
             res.send(marsupilami)
        
    }catch(e) {
        res.status(500).send(e)
    }
})

// PATCH /api/marsupilami/deletefriend/id
// @desc Add a friend
// @access Private

router.patch ('/deletefriend/:id',  async (req, res) => {
    const _id = req.params.id

    const updates = Object.keys(req.body)
    const allowedUpdates = ['friend']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update) )

    if (!isValidOperation) {
        return res.status(400).send({ error : 'Invalid updates'})
    }
    
    try {
        const marsupilami = await Marsupilami.findById(_id)
        if(!marsupilami) {
            return res.status(404).send('marsupilami does not exist !')
        }    
		const index = marsupilami.friends.indexOf(req.body.friend);
        marsupilami.friends.splice(index,1)
        marsupilami.save()  
             res.send(marsupilami)
        
    }catch(e) {
        res.status(500).send(e)
    }
})


router.delete('/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const marsupilami = await Marsupilami.findByIdAndDelete(_id)
        if(!marsupilami) {
            return res.status(404).send('marsupilami does not exist !')
        }  
        res.send(marsupilami)
    }catch(e) {
        res.status(500).send(e)
    }
})





module.exports = router


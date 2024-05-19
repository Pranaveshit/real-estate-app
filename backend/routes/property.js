const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { addProperty, getProperties, updateProperty, deleteProperty, getAllProperties } = require('../controllers/propertyController');

router.post('/', auth, addProperty);
router.get('/', auth, getProperties);
router.put('/:id', auth, updateProperty);
router.delete('/:id', auth, deleteProperty);
router.get('/all', getAllProperties);

module.exports = router;

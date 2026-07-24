const express = require('express');
const router = express.Router();
const { getAllContent, getSectionContent, updateSectionContent } = require('../controllers/content.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/', getAllContent);
router.get('/:section', getSectionContent);
router.put('/:section', protect, updateSectionContent);

module.exports = router;

const express = require('express');

const pageController = require('./controllers/pageController');
const courseController = require('./controllers/courseController');
const categoryController = require('./controllers/categoryController');

const router = express.Router();

router.route('/').get(pageController.getIndexPage);
router.route('/about').get(pageController.getAboutPage);
router.route('/courses').get(courseController.getAllCourses);
router.route('/courses').post(courseController.createCourse);
router.route('/course/:slug').get(courseController.getCourse);


router.route('/categories').post(categoryController.createCategory);



module.exports = router;

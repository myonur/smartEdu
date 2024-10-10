const express = require('express');

const pageController = require('./controllers/pageController');
const courseController = require('./controllers/courseController');
const categoryController = require('./controllers/categoryController');
const authController = require('./controllers/authController');



const router = express.Router();

router.route('/').get(pageController.getIndexPage);
router.route('/about').get(pageController.getAboutPage);
router.route('/courses').get(courseController.getAllCourses);
router.route('/courses').post(courseController.createCourse);
router.route('/course/:slug').get(courseController.getCourse);


router.route('/categories').post(categoryController.createCategory);

router.route('/register').get(pageController.getRegisterPage);
router.route('/signup').post(authController.createUser);

router.route('/login').get(pageController.getLoginPage);
router.route('/login').post(authController.loginUser);
router.route('/logout').get(authController.logoutUser);
router.route('/dashboard').get(authController.getDashboardPage);


module.exports = router;

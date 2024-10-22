const express = require('express');

const pageController = require('./controllers/pageController');
const courseController = require('./controllers/courseController');
const categoryController = require('./controllers/categoryController');
const authController = require('./controllers/authController');
const authMiddleware = require('./middlewares/authMiddleware');
const redirectMiddleware = require('./middlewares/redirectMiddleware');
const roleMiddleware = require('./middlewares/roleMiddleware');
const { body } = require('express-validator');
const User = require('./models/User');



const router = express.Router();


router.route('/signup').post(
    [
        body('name').not().isEmpty().withMessage('Please Enter Your Name'),
        body('email').isEmail().withMessage('Please Enter Valid Email')
        .custom((userEmail)=> {
            return User.findOne({email:userEmail}).then(user => {
                if (user) {
                    return Promise.reject('Email is already exists!')
                }
            })
        }),

        body('password').not().isEmpty().withMessage('Please Enter A Password'),
    ],
    
    authController.createUser); 


router.route('/').get(pageController.getIndexPage);
router.route('/about').get(pageController.getAboutPage);
router.route('/contact').get(pageController.getContactPage);
router.route('/contact').post(pageController.sendEmail);
router.route('/courses').get(courseController.getAllCourses);
router.route('/courses').post(roleMiddleware(["teacher","admin" ]), courseController.createCourse);
router.route('/courses/:slug').get(courseController.getCourse);
router.route('/courses/:slug').delete(courseController.deleteCourse);

router.route('/categories').post(categoryController.createCategory);

router.route('/register').get(redirectMiddleware,pageController.getRegisterPage);
//router.route('/signup').post(authController.createUser);

router.route('/login').get(redirectMiddleware, pageController.getLoginPage);
router.route('/login').post(authController.loginUser);
router.route('/logout').get(authController.logoutUser);
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage);

router.route('/courses/enroll').post(courseController.enrollCourse);
router.route('/courses/release').post(courseController.releaseCourse);



module.exports = router;

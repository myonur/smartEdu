const Course = require('../models/Course.js');
const Category = require('../models/Category.js');

exports.createCourse = async (req, res) => {

    try {
        const course = await Course.create(req.body);
        res.status(201).json({
            status: 'success',
            course

        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        })
    }

};

exports.getAllCourses = async (req, res) => {

    try {
        const courses = await Course.find();

        const categories = await Category.find();

        res.status(200).render('courses', {
            courses,
            categories,
            page_name: 'courses'
        })
    } catch (error) {
        res.status(400).json({
            status: 'Listelenemedi',
            error
        })
    }

};

exports.getCourse = async (req, res) => {

    try {
        const course = await Course.findOne({slug : req.params.slug});
        res.status(200).render('course', {
            course,
            page_name: 'courses'
        });
    } catch (error) {
        res.status(400).json({
            status: 'Listelenemedi',
            error
        })
    }

};
const Course = require('../models/Course.js');
const Category = require('../models/Category.js');
const User = require('../models/User');

exports.createCourse = async (req, res) => {

    try {
        const course = await Course.create({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            user: userIN
        });
        req.flash("success", `${course.name} kursu oluşturuldu`);
        res.status(201).redirect('/courses')
    } catch (error) {
      req.flash("error", `Something happened!`);
        res.status(400).json({
            status: 'fail',
            error
        })
    }

};

exports.getAllCourses = async (req, res) => {
  try {

    const categorySlug = req.query.categories;
    const query = req.query.search;

    const category = await Category.findOne({slug:categorySlug})

    let filter = {};

    if(categorySlug) {
      filter = {category:category._id}
    }

    if(query) {
      filter = {name:query}
    }

    if(!query && !categorySlug) {
      filter.name = "",
      filter.category = null
    }

    const courses = await Course.find({
      $or:[
        {name: { $regex: '.*' + filter.name + '.*', $options: 'i'}},
        {category: filter.category}
      ]
    }).sort('-ceatedAt').populate('user');
    const categories = await Category.find();

    res.status(200).render('courses', {
      courses,
      categories,
      page_name: 'courses',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};


exports.getCourse = async (req, res) => {
    try {
        const user = await User.findById(userIN);
        const course = await Course.findOne({ slug: req.params.slug }).populate('user')
        const categories = await Category.find();
        res.status(200).render('course', {
            course,
            page_name: 'courses',
            user,
            categories
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            user,
            error,
        });
    }
};


exports.enrollCourse = async (req, res) => {
    try {
        const user = await User.findById(userIN);

        await user.courses.push({ _id: req.body.course_id });
        await user.save();

        res.status(200).redirect('/dashboard');
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};

exports.releaseCourse = async (req, res) => {
    try {
        const user = await User.findById(req.session.userID);
        await user.courses.pull({ _id: req.body.course_id });
        await user.save();

        res.status(200).redirect('/dashboard');
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};


exports.deleteCourse = async (req, res) => {

  try {    

    const course = await Course.findOneAndDelete({slug:req.params.slug})
    
    req.flash("error", `${course.name} has been removed successfully`);

    res.status(200).redirect('/dashboard');

  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      error,
      
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {    

    const course = await Course.findOne({slug:req.params.slug});
    course.name = req.body.name;
    course.description = req.body.description;
    course.category = req.body.category;

    course.save();
   
    res.status(200).redirect('/dashboard');

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
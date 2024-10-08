const User = require('../models/User');

const bcrypt = require('bcrypt');





exports.createUser = async (req, res) => {

    try {
        const user = await User.create(req.body);
        res.status(201).json({
            status: 'success'
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail oldu',
            error
        })
    }

};


exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;


        const user = await User.findOne({ email });

        if (user) {
            bcrypt.compare(password, user.password, (err, same) => {
                if (same) {                                       
                    req.session.userID = user._id;
                    res.status(200).redirect('/dashboard');
                }
            });
        }
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};


exports.logoutUser = (req, res) => {
    req.session.destroy(() => {
      res.redirect('/');
    });
  };
  



exports.getDashboardPage = async (req, res) => {
    const user = await User.findOne({_id : userIN});
    console.log(user);
    res.status(200).render('dashboard' , {
        page_name : 'dashboard',
        user
    });

}


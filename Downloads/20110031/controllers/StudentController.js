const mygroup = require('../models/mygroup');

class studentController {
    show(req, res) {
        res.json(mygroup);
    }
}

module.exports = new studentController;
const mygroup = require('../models/mygroup');

class messageController {
    showMessNoID(req, res) {
        return res.json(mygroup);
    }
    showMessID(req, res) {
        const id = req.params.id;
        const member = mygroup.find((p) => p.id === id);
        if (!member) {
            return res.status(404).json({ error: 'not valid' });
        }
        res.send(`<html><body><ul><li>${member.name}</li></ul></body></html>`);
    }
}

module.exports = new messageController;
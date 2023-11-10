const mygroup = require('../models/mygroup');
const logRequest = require('../middleware/logRequestDetails');

class MssvController {
    showAllStudent(req, res) {
        const id = req.params.id;
        const member = mygroup.find((p) => p.id === id);
        if (!member) {
            return res.status(404).json({ error: 'not valid' });
        }
        res.json(member);

    }
    addStudent(req, res) {
        const id = req.params.id;
        const newStudent = req.body;
        const existingMember = mygroup.find((p) => p.id === id);
        if (!existingMember) {
            return res.status(404).json({ error: 'not valid' });
        }
        mygroup.push(newStudent);
    }
}

module.exports = new MssvController;
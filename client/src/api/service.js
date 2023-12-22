import StudentAPI from './studentAPI'


export default {
    
    createExam (exam) {
        return StudentAPI().post('addStudent',exam)
    },
    getExam(studentID) {
      return StudentAPI().get(`getProfileStudents/${studentID}`);
    },
    updateExam(examID, updatedExamData) {
      return StudentAPI().patch(`updateExam/${examID}`, updatedExamData);
    }

}
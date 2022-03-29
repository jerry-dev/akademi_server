import studentService from '../services/student.js';

class StudentController {
    async getStudents(req, res) {
        try {
            const students = await studentService.getStudents();
            return res.status(200).send(students);
        } catch (error) {
            return res.status(404).send(send.message);
        }
    }
}

const studentController = new StudentController();
export default studentController;
import StudentModel from '../models/Student.js';

class StudentService {
    constructor(studentModel) {
        this.studentModel = studentModel;
    }

    async getStudents() {
        try {
            return await this.studentModel();
        } catch (error) {
            console.error(`Error:`, error.message);
        }
    }
}

const studentService = new StudentService(new StudentModel());

export default studentService;
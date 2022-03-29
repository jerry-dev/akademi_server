import StudentModel from '../models/Student.js';

const studentModel = new StudentModel()

class StudentService {
    constructor(studentModel) {
        this.studentModel = studentModel;
    }

    async getStudents() {
        try {
            return await this.studentModel.find();
        } catch (error) {
            console.error(`Error:`, error.message);
        }
    }
}

const studentService = new StudentService(studentModel);

export default studentService;
import StudentModel from '../models/Student.js';
import EventModel from '../models/Events.js';
import FoodModel from '../models/Food.js';

const studentModel = new StudentModel()

class HomeService {
    constructor(studentModel) {
        this.studentModel = studentModel;
    }

    async getHomeData() {
        const homeData = {
            overview: {},
            unpaidTuition: []
        };

        try {
            const students = await this.studentModel.find();
        } catch (error) {
            console.error(`Error:`, error.message);
        }
    }
}

const homeService = new HomeService(studentModel);

export default homeService;
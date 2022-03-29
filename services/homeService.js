import StudentModel from '../models/Student.js';
import EventModel from '../models/Events.js';
import FoodModel from '../models/Food.js';

const studentModel = new StudentModel();
const foodModel = new FoodModel();

class HomeService {
    constructor(studentModel, foodModel) {
        this.studentModel = studentModel;
        this.foodModel = foodModel;
    }

    async getHomeData() {
        const homeData = {
            overview: {
                studentsCount: 0,
                teachersCount: 0,
                eventsCount: 0,
                foodsCount: 0
            },
            unpaidTuition: []
        };

        try {
            const students = await this.studentModel.find();
            const foods = await this.foodModel.find();

            homeData.overview.studentsCount = students.length;
            homeData.overview.foodsCount = foods.length;
            return homeData;
        } catch (error) {
            console.error(`Error:`, error.message);
        }
    }
}

const homeService = new HomeService(studentModel, foodModel);

export default homeService;
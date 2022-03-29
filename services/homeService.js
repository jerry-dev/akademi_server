import StudentModel from '../models/Student.js';
import EventModel from '../models/Event.js';
import FoodModel from '../models/Food.js';

const studentModel = new StudentModel();
const foodModel = new FoodModel();
const eventModel = new EventModel();

class HomeService {
    constructor(studentModel, foodModel, eventModel) {
        this.studentModel = studentModel;
        this.foodModel = foodModel;
        this.eventModel = eventModel;
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
            const events = await this.eventModel.find();

            homeData.unpaidTuition[homeData.unpaidTuition.length] = students.map((studentInstance) => {
                return {
                    studentFullName: studentInstance.studentName,
                    studentId: studentInstance.id,
                    studentClass: studentInstance.academicRecords.class,
                    studentDebt: studentInstance.financialRecords.debt,
                    studentPhoto: studentInstance.bio.profilePhoto
                };
            })

            homeData.overview.studentsCount = students.length;
            homeData.overview.foodsCount = foods.length;
            let eventsCount = 0;

            for (let month in events[0]) {
                if (month !== '_id') {
                    eventsCount = eventsCount + events[0][month].length;
                }
            }

            homeData.overview.eventsCount = eventsCount;
            return homeData;
        } catch (error) {
            console.error(`Error:`, error.message);
        }
    }
}

const homeService = new HomeService(studentModel, foodModel, eventModel);

export default homeService;
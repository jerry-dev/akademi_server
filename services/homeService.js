import StudentModel from '../models/Student.js';
import TeacherModel from '../models/Teacher.js';
import EventModel from '../models/Event.js';
import FoodModel from '../models/Food.js';

class HomeService {
    constructor(studentModel, teacherModel, foodModel, eventModel, ) {
        this.studentModel = studentModel;
        this.teacherModel = teacherModel;
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
            const teachers = await this.teacherModel.find();
            const foods = await this.foodModel.find();
            const events = await this.eventModel.find();

            homeData.unpaidTuition = students.map((studentInstance) => {
                return {
                    studentFullName: studentInstance.studentName,
                    studentId: studentInstance.id,
                    studentClass: studentInstance.academicRecords.class,
                    studentDebt: studentInstance.financialRecords.debt,
                    studentPhoto: studentInstance.bio.profilePhoto
                };
            })

            homeData.overview.studentsCount = students.length;
            homeData.overview.teachersCount = teachers.length;
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

const studentModel = new StudentModel();
const teacherModel = new TeacherModel();
const foodModel = new FoodModel();
const eventModel = new EventModel();

const homeService = new HomeService(studentModel, teacherModel, foodModel, eventModel);

export default homeService;
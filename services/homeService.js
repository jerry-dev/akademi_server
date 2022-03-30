import StudentModel from '../models/Student.js';
import TeacherModel from '../models/Teacher.js';
import MessageModel from '../models/Message.js';
import EventModel from '../models/Event.js';
import FoodModel from '../models/Food.js';

class HomeService {
    constructor(studentModel, teacherModel, messageModel, foodModel, eventModel, ) {
        this.studentModel = studentModel;
        this.teacherModel = teacherModel;
        this.messageModel = messageModel;
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
            unpaidTuition: null,
            messages: null
        };

        try {
            const students = await this.studentModel.find();
            const teachers = await this.teacherModel.find();
            const messages = await this.messageModel.find();
            const foods = await this.foodModel.find();
            const events = await this.eventModel.find();

            const setFakeTimeStamp = (studentMessages) => {
                studentMessages.forEach((messageInstance) => {
                    
                    messageInstance.messages.forEach((messageDetails) => {
                        let fakeTimeStamp = new Date(
                            Date.UTC(
                                new Date().getFullYear(),
                                new Date().getMonth(),
                                new Date().getDate(),
                                new Date().getUTCHours(),
                                Math.floor(Math.random() * 59)
                            )
                        ).toLocaleString().replace(/^.*, /, "");
                    
                        fakeTimeStamp = fakeTimeStamp.replace(/:00 /, " ");
                
                        messageDetails.timestamp = fakeTimeStamp;
                    });
                });
            }

            setFakeTimeStamp(messages);

            messages.forEach((messageInstance) => {
                delete messageInstance['_id'];
                for (let i = 0; i < students.length; i++) {
                    if (messageInstance.senderId === students[i].id) {
                        messageInstance.profilePhoto = students[i].bio.profilePhoto;
                        messageInstance.studentName = students[i].studentName;
                    }
                }
            });

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

            homeData.messages = messages;
            return homeData;
        } catch (error) {
            console.error(`Error:`, error.message);
        }
    }
}

const studentModel = new StudentModel();
const teacherModel = new TeacherModel();
const messageModel = new MessageModel();
const foodModel = new FoodModel();
const eventModel = new EventModel();

const homeService = new HomeService(studentModel, teacherModel, messageModel, foodModel, eventModel);

export default homeService;
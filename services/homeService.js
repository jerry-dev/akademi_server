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

    getOverview(students, teachers, foods, events) {
        const overview = [];
        overview[overview.length] = { "title": "students", "stat": `${students.length}` };
        overview[overview.length] = { "title": "teachers", "stat": `${teachers.length}` };
        overview[overview.length] = { "title": "foods", "stat": `${foods.length}` };
        
        let eventsCount = 0;

        for (let month in events[0]) {
            if (month !== '_id') {
                eventsCount = eventsCount + events[0][month].length;
            }
        }

        overview[overview.length] = { "title": "events", "stat": `${eventsCount}` };
        return overview;
    }

    getUnpaidTuition(students) {
        return students.map((studentInstance) => {
            return {
                studentFullName: studentInstance.studentName,
                studentId: studentInstance.id,
                studentClass: studentInstance.academicRecords.class,
                studentDebt: studentInstance.financialRecords.debt,
                studentPhoto: studentInstance.bio.profilePhoto
            };
        })
    }

    getRecentStudents(students) {
        let recentStudents = [];

        for (let i = students.length-1; i > students.length-21; i--) {
            let selectedStudent = {};
            selectedStudent.profilePhoto = students[i].bio.profilePhoto;
            selectedStudent.studentName = students[i].studentName;
            selectedStudent.class = students[i].academicRecords.class;
            selectedStudent.studentId = students[i].id;

            recentStudents[recentStudents.length] = selectedStudent;
        }

        return recentStudents;
    }

    getMessages(messages, students) {
        this.setFakeTimeStamp(messages);

        messages.forEach((messageInstance) => {
            delete messageInstance['_id'];
            for (let i = 0; i < students.length; i++) {
                if (messageInstance.senderId === students[i].id) {
                    messageInstance.profilePhoto = students[i].bio.profilePhoto;
                    messageInstance.studentName = students[i].studentName;
                }
            }
        });

        return messages;
    }

    setFakeTimeStamp(studentMessages) {
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

    getEvents(events) {
        return events.map((eventInstance) => {
            const { _id, ...reformattedEventInstance} = eventInstance;
            return reformattedEventInstance;
        });
    }

    getFood(food) {
        return food.map((foodInstance) => {
            return {
                itemName: foodInstance.itemName,
                ingredients: foodInstance.ingredients,
                menuImage: foodInstance.menuImage,
                description: foodInstance.description,
                nutrition: foodInstance.nutrition,
            };
        });
    }

    async getHomeData() {
        const homeData = {
            overview: null,
            unpaidTuition: null,
            messages: null,
            recentStudents: null,
            events: null,
        };

        try {
            const students = await this.studentModel.find();
            const teachers = await this.teacherModel.find();
            const messages = await this.messageModel.find();
            const foods = await this.foodModel.find();
            const events = await this.eventModel.find();
            
            homeData.overview = this.getOverview(students, teachers, foods, events);
            homeData.unpaidTuition = this.getUnpaidTuition(students);
            homeData.messages = this.getMessages(messages, students);
            homeData.recentStudents = this.getRecentStudents(students);
            homeData.events = this.getEvents(events);
            homeData.food = this.getFood(foods);
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
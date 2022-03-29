import homeService from '../services/homeService.js';

class HomeController {
    async getHomeData(req, res) {
        try {
            const homeData = await homeService.getHomeData();
            return res.status(200).send(homeData);
        } catch (error) {
            return res.status(404).send(send.message);
        }
    }
}

const homeController = new HomeController();
export default homeController;
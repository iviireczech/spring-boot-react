import { ajaxService } from '../../main';

export default class InfoService {

    getInfo() {
        return ajaxService.get("/info");
    }

}
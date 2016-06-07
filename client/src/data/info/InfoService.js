import DataAccessService from '../DataAccessService';

export default class InfoService extends DataAccessService {

    getInfo() {
        return this.get("/info");
    }

}
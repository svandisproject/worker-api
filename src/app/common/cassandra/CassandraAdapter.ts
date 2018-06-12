import {CassandraClientService} from "../../websockets/worker/services/CassandraClientService";

export abstract class CassandraAdapter {
    protected abstract cassandraService: CassandraClientService;
}

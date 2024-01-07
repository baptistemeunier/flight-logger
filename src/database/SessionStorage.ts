import { SessionStorageNotInitException } from "@/exceptions";
import { FlightLog, Qualication } from "./types";

export default class SessionStorage {
    private flightLogsKey = "flightLogs";
    private qualicationsKey = "qualications";

    private loadItem(itemKey: string) {
        let item = window.localStorage.getItem(itemKey);
        if(item == null) {
            throw new SessionStorageNotInitException("No key " + itemKey + " exist");
        }

        return JSON.parse(item);
    }

    private saveItem(item: string, value: any) {
        window.localStorage.setItem(item, value));
    }

    loadFlightLogs(): FlightLog[] {
        return this.loadItem(this.flightLogsKey)
    }

    saveFlightLogs(flightLogs: FlightLog[]) {
        this.saveItem(this.flightLogsKey, JSON.stringify(flightLogs))
    }

    loadQualications(): Qualication[] {
        return this.loadItem(this.qualicationsKey)
    }

    saveQualications(qualications: Qualication[]) {
        this.saveItem(this.qualicationsKey, JSON.stringify(qualications))
    }
}
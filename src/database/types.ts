export type AirfieldLog = {
    field: string,
    time: string
}

export type AircraftLog = {
    designation: string,
    registration: string,
    class: string | undefined,
    type: string | undefined,
}

export type DayNightValue<N> = {
    day: N
    night: N
}

export type FlightLog = {
    id: number
    date: string,
    from: AirfieldLog,
    to: AirfieldLog,
    aircraft: AircraftLog,
    flightTime: {
        singlePilot: {
            singleEngine: number
            multiEngine: number
        },
        multiPilot: number
        total: number
        night: number
        instrument: number
        crossCountry: number
        inFunction: {
            pilotInCommand: number
            copilot: number
            dual: number
            instructor: number
        },
    }
    takeoff: DayNightValue<number>
    landing: DayNightValue<number>
    pilotInCommand: string
    fstd: null // TODO : Add fstd info
    remarks: string
    notes: string
    signature: null, // TODO : Add sign function
    gpx: null, // TODO : Add gpx support
}

export type Qualication = {
    type: "LICENSE" | "RATING" | "MEDICAL" | "LANGUAGE" | "CERFICATE"
    name: string
    issueAt: Date
    expiresAt: Date|null
    number: string|null
}
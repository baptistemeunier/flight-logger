"use client"

import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams, GridValueFormatterParams } from '@mui/x-data-grid';
import { FlightLog } from '@/database/types';
import SessionStorage from '@/database/SessionStorage';

let formatTime = (time: number) => (Math.floor(time / 60)) + ":" + ((time % 60 < 10) ? "0" : "") + (time % 60);
let flightTimeFormater = (params: GridValueFormatterParams<number>) => params.value == 0 ? "" : formatTime(params.value)

const columns: GridColDef<FlightLog>[] = [
  {
    field: 'formatDate',
    headerName: 'Date',
    width: 160,
    valueFormatter: (params: GridValueFormatterParams<string>) => `${(new Date(params.value)).toLocaleDateString('utc')}`,
    valueGetter: (params: GridValueGetterParams<FlightLog>) => params.row.date,
  },
  {
    field: 'departure',
    headerName: 'Departure',
    width: 200,
    sortable: false,
    valueGetter: (params: GridValueGetterParams<FlightLog>) =>
      `${params.row.from.field}` + (params.row.from.time ? " at ?" : ""),
  },
  {
    field: 'arrival',
    headerName: 'Arrival',
    width: 200,
    sortable: false,
    valueGetter: (params: GridValueGetterParams<FlightLog>) =>
      `${params.row.to.field}` + (params.row.to.time ? " at ?" : ""),
  },
  {
    field: 'aircraft',
    headerName: 'Aircraft',
    width: 100,
    sortable: false,
    valueGetter: (params: GridValueGetterParams<FlightLog>) => params.row.aircraft.designation,
  },
  {
    field: 'registration',
    headerName: 'Aircraft Reg',
    width: 150,
    sortable: false,
    valueGetter: (params: GridValueGetterParams<FlightLog>) => params.row.aircraft.registration,
  },
  {
    field: 'totalTime',
    headerName: 'Total time',
    width: 150,
    sortable: false,
    valueFormatter: flightTimeFormater,
    valueGetter: (params: GridValueGetterParams<FlightLog>) => params.row.flightTime.total,
  },
  {
    field: 'pilotInCommand',
    headerName: 'PIC Name',
    width: 150,
    sortable: false,
    valueGetter: (params: GridValueGetterParams<FlightLog>) => params.row.pilotInCommand,
  },
  {
    field: 'dayTakeoff',
    headerName: 'Day takeoff',
    width: 130,
    sortable: false,
    valueGetter: (params: GridValueGetterParams<FlightLog>) => params.row.takeoff.day,
  },
  {
    field: 'nightTakeoff',
    headerName: 'Night takeoff',
    width: 130,
    sortable: false,
    valueGetter: (params: GridValueGetterParams<FlightLog>) => params.row.takeoff.night,
  },
  {
    field: 'dayLandings',
    headerName: 'Day landings',
    width: 130,
    sortable: false,
    valueGetter: (params: GridValueGetterParams<FlightLog>) => params.row.landing.day,
  },
  {
    field: 'nightLandings',
    headerName: 'Night landings',
    width: 130,
    sortable: false,
    valueGetter: (params: GridValueGetterParams<FlightLog>) => params.row.landing.night,
  },
  {
    field: 'nightTime',
    headerName: 'Night',
    width: 130,
    sortable: false,
    valueFormatter: flightTimeFormater,
    valueGetter: (params: GridValueGetterParams<FlightLog>) => params.row.flightTime.night,
  },
  {
    field: 'instrumentTime',
    headerName: 'IFR',
    width: 130,
    sortable: false,
    valueFormatter: flightTimeFormater,
    valueGetter: (params: GridValueGetterParams<FlightLog>) => params.row.flightTime.instrument,
  },
  {
    field: 'pilotInCommandTime',
    headerName: 'PIC',
    width: 130,
    sortable: false,
    valueFormatter: flightTimeFormater,
    valueGetter: (params: GridValueGetterParams<FlightLog>) => params.row.flightTime.inFunction.pilotInCommand,
  },
  {
    field: 'copilotTime',
    headerName: 'Co-Pilot',
    width: 130,
    sortable: false,
    valueFormatter: flightTimeFormater,

    valueGetter: (params: GridValueGetterParams<FlightLog>) => params.row.flightTime.inFunction.copilot,
  },
  {
    field: 'dualTime',
    headerName: 'Dual',
    width: 130,
    sortable: false,
    valueFormatter: flightTimeFormater,

    valueGetter: (params: GridValueGetterParams<FlightLog>) => params.row.flightTime.inFunction.dual,
  },
  {
    field: 'instructorTime',
    headerName: 'FI',
    width: 130,
    sortable: false,
    valueFormatter: flightTimeFormater,

    valueGetter: (params: GridValueGetterParams<FlightLog>) => params.row.flightTime.inFunction.instructor,
  },
  {
    field: 'remarks',
    headerName: 'Remarks and Endorsements',
    width: 300,
    sortable: false,
  }
];

export default function DataTable() {
  let sessionStorage = new SessionStorage();

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        rows={sessionStorage.loadFlightLogs()}
        columns={columns}
        initialState={{
          sorting: {
            sortModel: [{ field: "formatDate", sort: "desc" }]
          },
          pagination: {
            paginationModel: { page: 0, pageSize: 50 },
          },
          columns: {
            columnVisibilityModel: { 
              registration: false, 
              dayTakeoff: false, 
              nightTakeoff: false,
              instructorTime: false }
          }
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
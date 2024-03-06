import React from 'react'
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/dist/styles/ag-grid.css"
import "ag-grid-community/dist/styles/ag-theme-alpine.css"
import styled from 'styled-components'
import { Alert } from 'react-bootstrap'


const Styles = styled.div`
.ag-row-hover {
    /* putting in !important so it overrides the theme's styling as it hovers the row also */
    background-color: #9FD1DC !important;
}
`

export default function CreateResultTable(props) {
    if (props.data.length !== 0) {
        const columns = [
            { headerName: "Date", field: "time", sortable: true, filter: 'agDateColumnFilter', resizable: true },
            { headerName: "Open ($)", field: "open", sortable: true, filter: 'agNumberColumnFilter', width: 110, resizable: true },
            { headerName: "High ($)", field: "high", sortable: true, filter: 'agNumberColumnFilter', width: 110, resizable: true },
            { headerName: "Low ($)", field: "low", sortable: true, filter: 'agNumberColumnFilter', width: 110, resizable: true },
            { headerName: "Close ($)", field: "close", sortable: true, filter: 'agNumberColumnFilter', width: 110, resizable: true },
            { headerName: "Volumes", field: "volumes", sortable: true, filter: 'agNumberColumnFilter', width: 140, resizable: true },
        ]
        const tableData = props.data.map((x) => ({
            time: x.time.getFullYear() + '-' + ('0' + (x.time.getMonth() + 1)).slice(-2) + '-' + ('0' + x.time.getDate()).slice(-2),
            open: x.open,
            high: x.high,
            low: x.low,
            close: x.close,
            volumes: x.volumes
        }))
        return (
            <Styles className="ag-theme-alpine result-table" style={{ height: "440px" }}>
                <AgGridReact
                    rowSelection='single'
                    columnDefs={columns}
                    rowData={tableData}
                    pagination={true}
                    paginationPageSize={8}
                />
            </Styles>
        )
    }
    else {
        return (
            <Styles>
                <Alert variant="danger" className="alert-date"><b>Error:</b> It looks like there is no data available on the selected date. Please search another date.</Alert>
            </Styles>
        )
    }

}
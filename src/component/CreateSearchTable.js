import React from 'react'
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/dist/styles/ag-grid.css"
import "ag-grid-community/dist/styles/ag-theme-alpine.css"
import { withRouter } from 'react-router'
import styled from 'styled-components'


const Styles = styled.div`
.ag-row-hover {
    /* putting in !important so it overrides the theme's styling as it hovers the row also */
    background-color: #9FD1DC !important;
}
`

function CreateTable(props) {
    const columns = [
        { headerName: "Symbol", field: "symbol", sortable: true, resizable: true },
        { headerName: "Company Name", field: "name", sortable: true, width: 280, resizable: true },
        { headerName: "Industry", field: "industry", sortable: true, filter: true, resizable: true },
    ]

    return (
        <Styles className="ag-theme-alpine ag-row-hover" style={{ height: "450px" }}>
            <AgGridReact
                rowSelection='single'
                columnDefs={columns}
                rowData={props.data}
                pagination={true}
                paginationPageSize={8}
                //when row is clicked, return the stock symbol
                onRowClicked={(e) => props.history.push(`result-page/${e.api.getSelectedRows()[0].symbol}`)}
            />
        </Styles>
    )
}

export default withRouter(CreateTable)
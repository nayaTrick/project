import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Row, Col } from 'react-bootstrap'

export default function SearchDate(props) {
    const today = new Date();
    const todaydate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2)
    const [date, setDate] = useState('')
    const [todate, settoDate] = useState(todaydate)
    return (
        <Styles>
            <Row>
                <Col md={2}>
                    <span className='search-title'>Search by date</span>
                </Col>
                <Col md={4}>
                    <label htmlFor="searchdate" className='label-search'>From
                    <input
                            className="date-form"
                            type="date"
                            min="2015-01-01"
                            max={todaydate}
                            id="searchdate"
                            name="searchdate"
                            value={date}
                            onChange={(x) => setDate(x.target.value)}>
                        </input>
                    </label>
                </Col>
                <Col md={4}>
                    <label htmlFor="todate" className='label-search'>To
                    <input
                            className="dateto-form"
                            type="date"
                            //date to should be larger than date from.
                            min={date}
                            max={todaydate}
                            id="todate"
                            name="todate"
                            value={todate}
                            onChange={(x) => settoDate(x.target.value)}>
                        </input>
                    </label>
                </Col>
                <Col md={2}>
                    <Button
                        variant="outline-info"
                        onClick={() => props.onSubmit(date, todate)}
                    >Search
                    </Button>
                </Col>
            </Row>
        </Styles>
    )
}


const Styles = styled.div`
margin-bottom:30px;
.label-search{
    margin-left:30px;
} 
.date-form{
    margin-left:10px;
}
.dateto-form{
    margin-left:10px;
}
.btn{
    margin-left:35px;
}
@media (max-width: 768px) {

}
@media (max-width: 576px) {
    .label-search{
        margin-left:10px;
    } 
    .search-title{
        margin-left:10px;
    }
    .date-form{
        margin-left:20px;
    }
    .dateto-form{
        margin-left:40px;
    }
    .btn{
        margin-left:0px;
    }
}
`

import React, { useState, useEffect, useMemo } from 'react'
import CreateResultTable from '../component/CreateResultTable'
import SearchDate from '../component/SearchDate'
import CreateChart from '../component/CreateChart'
import Jumbotron1 from '../component/Jumbotron1'
import styled, { keyframes } from 'styled-components'
import { Spinner, Alert } from 'react-bootstrap'
import resultData from '../data/resultData'

export default function ResultPage({ match }) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [datefrom, setdateFrom] = useState('');
    const [dateto, setdateTo] = useState('');

    function SetData() {
        //find index of selected symbol
        const index = resultData.findIndex(x => x.stocksymbol === match.params.id);
        //change time format
        resultData[index].data.forEach(x => {
            x.time = new Date(x.time.match(/.*(?=\.000Z)/gi)[0].concat('+10:00'));
        })
        setData(resultData[index].data);
    }
    useEffect(() => {
        try {
            SetData();
            setLoading(false);
        }
        catch{
            setError('error in retrieving the data');
            setLoading(false);
        }
    }, [])

    //Call function to filter data with useMemo for optimisation
    const searchDateData = useMemo(() => FilteredData(data, datefrom, dateto), [data, dateto, datefrom])

    if (loading) {
        return (
            <Styles>
                <Jumbotron1 />
                <div className='result-content'>
                    <Alert variant="secondary" className="loading-alert"><Spinner animation="border" variant="secondary" className="loading-spinner" />Please wait while we are collecting the data...</Alert>
                </div>
            </Styles>

        )
    }
    if (error) {
        return (
            <Styles>
                <Jumbotron1 />
                <div className='result-content'>
                    <Alert variant="danger">Something went wrong: {error.message}.
            Please check your internet connection and reload the page.</Alert>
                </div>
            </Styles>
        )
    }
    return (
        <Styles >
            <Jumbotron1 />
            <div className="result-content">
                <h2 className='result-title'>{data[0].name} ({data[0].symbol})</h2>
                <h5 className='industry'>{data[0].industry}</h5>
                <SearchDate onSubmit={(x, y) => {
                    setdateFrom(x)
                    setdateTo(y)
                }} />
                <CreateChart data={searchDateData} tdatefrom={datefrom}
                    tdateto={dateto} candlestick={true}/>
                <h5 className='table-title'>Trading price history for {data[0].name}</h5>
                <CreateResultTable data={searchDateData} />
            </div>

        </Styles >
    )

}

function FilteredData(data, datefrom, dateto) {
    const tempdatefrom = new Date(datefrom).getTime()
    //concat with time so that it will get the time as per the date in server
    const tempdateto = new Date(dateto.concat('T14:00:00.000Z')).getTime()
    let searchdata = data;
    // if (datefrom !== '') {
    //     searchdata = data.filter((e) => (e.time.getTime() >= tempdatefrom) &&
    //         (e.time.getTime() <= tempdateto));
    // }
    // // in case client only filter by date to
    // if (datefrom === '' && dateto !== '') {
    //     searchdata = data.filter((e) => (e.time.getTime() >= new Date('2019-01-01').getTime()) &&
    //         (e.time.getTime() <= tempdateto));
    // }
    if (datefrom !== '' && dateto !== '') {
        searchdata = data.filter((e) => e.time.getTime() >= tempdatefrom && e.time.getTime() <= tempdateto);
      } else if (dateto !== '') {
        searchdata = data.filter((e) => e.time.getTime() <= tempdateto);
      } else if (datefrom !== '') {
        searchdata = data.filter((e) => e.time.getTime() >= tempdatefrom);
      }
      
    return (searchdata)
}

const fadeIn = keyframes`
0% {
    opacity: 0;
  }
100% {
    opacity: 1;
  }

`

const Styles = styled.div`
.result-content{
    width:800px;
    margin:0 auto;
    margin-bottom: 100px;
}
.result-title{
    text-decoration: underline;
    text-decoration-color: #487D8E;
}
.industry{
    margin-bottom:3%;
}
.table-title{
    margin-top:2%;
}
.loading-alert{
    font-size:120%;
    animation: 1s ${fadeIn} ease-out;
}
.loading-spinner{
    margin-right: 2rem;
}
@media (max-width: 768px) {
    .result-content{
        width:576px;
    }
}
@media (max-width: 576px) {
    .result-content{
        width:350px;
    }

}
`


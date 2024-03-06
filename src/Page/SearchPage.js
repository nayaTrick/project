import React, { useState, useMemo } from 'react'
import SearchBar from '../component/SearchBar'
import FetchApiAll from '../component/FetchApiAll'
import CreateTable from '../component/CreateSearchTable'
import ErrorHandling from "../component/ErrorHandling"
import Jumbotron1 from '../component/Jumbotron1'

import styled, { keyframes } from 'styled-components'
import { Spinner, Alert } from 'react-bootstrap'

export default function SearchPage() {
    const [search, setSearch] = useState('')
    const [stock, setStock] = useState(true)
    const { loading, data, error } = FetchApiAll()

    //Get the data to be shown in table; using useMemo to improve optimisation
    const searchdata = useMemo(() => SearchData(search, stock, data), [search, stock, data])
    return (
        <Styles>
            <Jumbotron1 searchpage={true} />
            <div className='search-content'>
                <h2 className='search-title'>Search Stocks Becomes Easy with StockWatch</h2>
                <p>We strive to give the best experience for you. Keep up to date with your favourite stocks by
                    searching with stocks symbol or by industry name. Click the stock and explore the stock price easily.</p>
                {loading && <Alert variant="secondary" className="loading-alert"><Spinner animation="border" variant="secondary" className="loading-spinner" />Please wait while we are collecting the data...</Alert>}
                {!loading && !error && <SearchBar onSubmit={(x, y) => { setSearch(x); setStock(y) }} />}
                {!loading && <ErrorHandling error={error} stock={stock} data={searchdata} search={search} />}
                {!loading && !error && <CreateTable data={searchdata} />}
            </div>

        </Styles>
    )
}

function SearchData(search, stock, data) {
    if (search !== '') {
        if (stock) {
            const filterItems = (arr, query) => {
                return arr.filter(e => e.symbol.toLowerCase().indexOf(query.toLowerCase()) !== -1)
            }
            return (filterItems(data, search))

        } else {
            const filterIndustry = (arr, query) => {
                return arr.filter((e) => e.industry.toLowerCase().indexOf(query.toLowerCase()) !== -1)
            }
            return (filterIndustry(data, search))
        }
    }
    else { return data }
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
p{
    text-align: justify;
}
.search-content{
    width:700px;
    margin:0 auto;
    margin-bottom: 100px;
}
.search-title{
    text-decoration: underline;
    text-decoration-color: #487D8E;
}
.loading-alert{
    font-size:120%;
    animation: 1s ${fadeIn} ease-out;
}
.loading-spinner{
    margin-right: 2rem;
}

@media (max-width: 992px) {}
@media (max-width: 768px) {
    .search-content{
        width:576px;
    }
}
@media (max-width: 576px) {
    .search-content{
        width:320px;
    }
    .search-title{
        font-size:120%;
    }
    p{
        font-size:90%;
    }
}


`;
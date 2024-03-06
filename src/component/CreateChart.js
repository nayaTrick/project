import React from 'react'
import { Line, defaults } from 'react-chartjs-2';
import styled from 'styled-components'

//for responsive behaviour
defaults.global.maintainAspectRatio = false

const Styles = styled.div`
.chart-container {
    position: relative; 
    height:60vh; 
    width:80vw;
  }

`

export default function CreateChart(props) {
    if (props.data.length !== 0) {
        //sorting the date from beginning.
        const data = props.data.sort(function (a, b) {
            return a.time - b.time;
        });
        const chartData = {
            //change the date format.
            labels: data.map((x) => x.time.getFullYear() + '-' +
                ('0' + (x.time.getMonth() + 1)).slice(-2) + '-' + ('0' + x.time.getDate()).slice(-2)),
            datasets: [
                {
                    label: 'Close',
                    fill: false,
                    lineTension: 0.2,
                    borderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1.5,
                    data: data.map(e => e.close)
                },
                {
                    label: 'Open',
                    fill: false,
                    lineTension: 0.2,
                    borderColor: 'rgba(252,147,65,0.5)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(252,147,65,0.5)',
                    pointHoverBorderColor: 'rgba(220,22#30,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1.5,
                    data: data.map(e => e.open),
                },
            ],
        }
        const lineOptions = {
            //to make it responsive
            maintainAspectRatio: false,
            title: {
                display: true,
                text: LabelChart(props.tdatefrom, props.tdateto),
                fontSize: 20
            },
            legend: {
                display: true,
                position: 'right',

            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false,
                    },
                    //label x axis
                    scaleLabel: {
                        display: true,
                        labelString: 'Date'
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: true,
                    },
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values) {
                            return '$' + value;
                        }
                    },
                    //label y axis
                    scaleLabel: {
                        display: true,
                        labelString: 'Price'
                    }
                }],
            },
        }
        return (
            <Styles>
                <div className="chart-container">
                    <Line
                        data={chartData}
                        options={lineOptions}
                    />
                </div>
            </Styles>
        )
    }
    else {
        return (null)
    }


}


function LabelChart(datefrom, dateto) {
    let label
    //when date from has been updated.
    if (datefrom !== '' && dateto !== '') {
        label = `The Opening and Closing Price for the Period of ${datefrom} to ${dateto}`
    }
    //date from in undefined
    if (datefrom === '' && dateto !== '') {
        label = `The Opening and Closing Price for the Period to ${dateto}`
    }
    //first load data
    if (datefrom === '' && dateto === '') {
        label = `The Opening and Closing Price Chart`
    }
    return label
}



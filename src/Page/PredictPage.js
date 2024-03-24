import React, { useState } from 'react';
import Jumbotron1 from '../component/Jumbotron1'
import styled, { keyframes } from 'styled-components'
import SearchBarPredict from '../component/SearchBarPredict';


function PredictPage() {
    const [predictions, setPredictions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const handleErrorMessage = (message, duration) => {
        setError(message);
        setTimeout(() => {
            setError(null);
        }, duration);
    };



    const handleSearch = async (stockSymbol) => {
        try {
            // Make API call to fetch predictions using the stockSymbol
            setLoading(true);
            const response = await fetch(`http://127.0.0.1:8000/predict?stockSymbol=${stockSymbol}`);
            const data = await response.json();
            console.log(data)
            setPredictions(data); // Assuming data structure for predictions
            setLoading(false);
            setError(null);
        } catch (error) {
            console.error('Error fetching predictions:', error);
            handleErrorMessage('Error fetching predictions. Please try again.',2000);
            setLoading(false);
        }
    };



return (
    <Styles>
        <Jumbotron1 searchpage={true} />
        <div className='predict-content'>
            <h2 className='predict-title'>Predict Stocks Becomes Easy with StockWatch</h2>
            <p>Give the stock symbol in the below textbox and see the future price</p>
            
        </div>

        <div>
           
            <SearchBarPredict onSubmit={handleSearch} />
            {loading && <p>Loading predictions...</p>}
            {error && <p>Error: {error}</p>}
            {/* Display predictions or other content related to prediction */}

        </div>

        
        


    </Styles>
)

  
    
    
    // <div>
      
    //   <input 
    //     type="text" 
    //     value={inputText} 
    //     onChange={handleInputChange} 
    //     placeholder="Enter your prediction..." 
    //   />
    //   <p>Your prediction: {inputText}</p>
    // </div>
  
}

export default PredictPage;
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
.predict-content{
    width:700px;
    margin:0 auto;
    margin-bottom: 10px;
}
.predict-title{
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
// .input-container {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     // margin-top: 10px; /* Adjust margin as needed */
//     // margin: 25px 25px 25px 25px

// .prediction-container{
//     display:flex;
//     flex-direction: column;
//     align-items:center;
//     margin: 25px 25px 25px 25px;
// }
//     .stock-name-container {
//     display:flex;
//     flex-direction:column;
//     align-items:center;
//     width: 300px; /* Increased input box width */
//     padding: 10px; /* Added padding */
//     font-size: 16px; /* Added font size */
//   }
//   .prediction-container {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     margin: 25px 0; /* Adjusted margin */
//   }
//   .prediction-text {
//     text-align: center; /* Centered prediction text */
  }

@media (max-width: 992px) {}
@media (max-width: 768px) {
    .predict-content{
        width:576px;
    }
}
@media (max-width: 576px) {
    .predict-content{
        width:320px;
    }
    .predict-title{
        font-size:120%;
    }
    p{
        font-size:90%;
    }
}


`;





import React, { useState } from 'react';
import Jumbotron1 from '../component/Jumbotron1'
import styled, { keyframes } from 'styled-components'

function PredictPage() {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

//   return (
    
//     <div>
//       
//       <input 
//         type="text" 
//         value={inputText} 
//         onChange={handleInputChange} 
//         placeholder="Enter your prediction..." 
//       />
//       <p>Your prediction: {inputText}</p>
//     </div>
//   );
return (
    <Styles>
        <Jumbotron1 searchpage={true} />
        <div className='predict-content'>
            <h2 className='predict-title'>Predict Stocks Becomes Easy with StockWatch</h2>
            <p>Give the stock symbol in the below textbox and see the future price</p>
            
        </div>

    </Styles>
)
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
    margin-bottom: 100px;
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



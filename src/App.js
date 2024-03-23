import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './Page/Nav';
import Footer from './Page/Footer'
import HomePage from './Page/HomePage';
import SearchPage from './Page/SearchPage';
import ResultPage from './Page/ResultPage';
import Layout from './component/Layout'
// import Filter from './Page/Filter';
import PredictPage from './Page/PredictPage';


function App() {
  return (
    <React.Fragment>
      <Layout>
        <Router>
          <Nav />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/search" exact component={SearchPage} />
            <Route path="/result-page/:id" component={ResultPage} />
            {/* <Route path="/filter" exact component={Filter}/> */}
            <Route path="/predict" exact component={PredictPage}/>
          </Switch>
          <Footer />
        </Router>
      </Layout>
    </React.Fragment>
  );
}

export default App;

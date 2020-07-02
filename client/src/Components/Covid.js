import React, { Component } from 'react';

import CanvasJSReact from "../Assets/canvasjs.react";
import PropTypes from 'prop-types';
import ReactCountryFlag from "react-country-flag"
import { connect } from 'react-redux';
import { getCovidData } from '../others/action/Action';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Covid extends Component {
 componentDidMount() {
     this.props.getCovidData();
 }
 renderChart = () => {
  if (this.props.covid.isRetrieved) {
 
 const Global=this.props.covid.covid.Global;
 
  const options = {
    theme: "dark2",
    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: "Covid 19 Global Live Statistics"
    },
    axisY: {
      title: "Number of People",
      labelFormatter: this.addSymbols,
      
    },
    axisX: {
      title: "Cases",
      reversed: true,
     
    },
    data: [
    {
      type: "bar",
      showInLegend: true,
      dataPoints: [
       
        { label: "New Confirmed", y:(Global.NewConfirmed)},
        { label: "Total Confirmed", y: (Global.TotalConfirmed)},
        { label: "New Deaths", y:(Global.NewDeaths)},
        { label: "Total Deaths", y: (Global.TotalDeaths)},
        { label: "New Recovered", y:(Global.NewRecovered)},
        { label: "Total Recovered", y: (Global.TotalRecovered)},
      ]
    }
    ]
    
  }

  
    return (
      <div className="row">
    
      <CanvasJSChart options = {options}
        /* onRef={ref => this.chart = ref} */
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
               );
  }
 
  return (
    <p>
  
    </p>
  );
 
};
addSymbols(e){
  var suffixes = ["", "K", "M", "B"];
  var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
  if(order > suffixes.length - 1)
    order = suffixes.length - 1;
  var suffix = suffixes[order];
  return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
}
 sendNotification=() => {
  
   
   
       if (this.props.covid.isRetrieved){
     const Global=this.props.covid.covid.Global;
    return(
        <ToastContainer>
         { toast.success("Successfully Retrieved Data !")}
         { toast.error("New Deaths:"+Global.NewDeaths)}
        </ToastContainer >
    );
  }
  
 
 
 

 }
 renderTable = () => {
    const {covid}=this.props.covid;
   
    if (this.props.covid.isRetrieved) {
      

     
      
      return (
        <div class="center">
        <table class="responsive-table">
       
        <thead>
       
       <tr>
       
       <th >Country</th>
       <th >Flag</th>
       <th>NewConfirmed</th>
       <th>TotalConfirmed</th>
       <th>NewDeaths</th>
       <th>TotalDeaths</th>
       <th>NewRecovered</th>
       <th>TotalRecovered</th>
      
       
       </tr>
      
        </thead>
        <tbody>
          {
           covid.Countries.map((Countries)=>
           <tr key={Countries.Country}>
           <td style={{backgroundColor:"rgb(173, 45, 135)"}}>{Countries.Country}</td>
           <td style={{backgroundColor:"rgb(132, 210, 226)"}}> <ReactCountryFlag countryCode={Countries.CountryCode} svg /></td>
             <td style={{backgroundColor:"rgb(185, 175, 43)"}}> {Countries.NewConfirmed}</td>
             <td style={{backgroundColor:"rgba(189, 120, 29, 0.555)"}}>{Countries.TotalConfirmed}</td>
              <td style={{backgroundColor:"#FF0000"}}>{Countries.NewDeaths}</td>
              <td style={{backgroundColor:"rgb(218, 54, 29)"}}> {Countries.TotalDeaths}</td>
              <td style={{backgroundColor:"rgb(35, 58, 4)"}}>{Countries.NewRecovered}</td>
            <td style={{backgroundColor:"rgb(90, 175, 101)"}}>{Countries.TotalRecovered}</td>
            
           </tr>
           
           )}
       
          
        </tbody>
        </table>
       </div>
      
  
   
      );
    }
    return (
      <div>
      <div id="progressive" id="font-color">
      <h3 class="loadFont center-align animated bounceInLeft" id="side1">Please Wait<span id="dot1">...</span><span id="dot2">...</span></h3>
    
      <div class="progress z-depth-1 animated bounceInLeft" id="side2">
        <div class="progress-bar" data-transitiongoal="100"></div>
      </div>
      </div>
      </div>
    );
  };
  render() {
    return (
      <div className="wrapper">
      <div>
     
     {this.sendNotification()}
    
     </div>
      <div className="container">
        {this.renderChart()}
      </div>
      <div className="container">
     {this.renderTable()}
     
     
      </div>
      </div>
    );
  }
}
Covid.propTypes= {
   getCovidData:PropTypes.func.isRequired,
   covid:PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  covid:state.covid
});
export default connect(mapStateToProps,
    {getCovidData})
     (Covid)
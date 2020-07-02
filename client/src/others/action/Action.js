import {GET_COVID_DATA, LOADING_DATA} from './Types';

import axios from "axios";

export const getCovidData = () => dispatch => {
    dispatch({
        type:LOADING_DATA,
      
      })
  axios.get("/api/covid19").then(res =>
    dispatch({
      type:GET_COVID_DATA ,
      payload: res.data
    })
  );
};
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';



export const getTrendings =  createAsyncThunk("trendings/getTrendings", async()=>{
    const response = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/coin-market-cap/trending`);
    return response.data;
            
})

export const getGainersLosers =  createAsyncThunk("trendings/getGainersLosers", async()=>{
  const response = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/coin-market-cap/gainers-losers`);
  return response.data;
          
})

export const getMostVisited =  createAsyncThunk("trendings/getMostVisited", async()=>{
  const response = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/coin-market-cap/most-visited`);
  return response.data;
          
})

export const trendingsSlice = createSlice({
  name: 'trendings',
  initialState: {
    latest: [],
    gainers:[],
    losers:[],
    mostVisited:[],

  },
  reducers: {
    changeTredings: (state, action) => {
      state.latest = action.payload
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(getTrendings.fulfilled,(state, action)=>{
      if(action.payload){
        state.latest = action.payload
      }      
    })
    builder.addCase(getMostVisited.fulfilled,(state, action)=>{
      if(action.payload){
        state.mostVisited = action.payload
      }      
    })
    builder.addCase(getGainersLosers.fulfilled,(state, action)=>{
      if(action.payload){
        state.gainers = action.payload.gainers;
        state.losers = action.payload.losers;
      }
      
    })
  }
})

// Action creators are generated for each case reducer function
export const {  changeTredings } = trendingsSlice.actions

export default trendingsSlice.reducer
import { useEffect, useState } from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import {useDispatch } from "react-redux";

import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Chart from "./views/Chart/index";
import Ranking from "./views/Currencies/Ranking/index";
import TrendingTokens from "./views/Currencies/Trending-Tokens";
import GainersLosers from "./views/Currencies/Gainers-Losers";

import ScrollToTopButton from "./components/ScrollToTopButton";

import {getTrendings, getGainersLosers, getMostVisited} from './store/slices/trendings-slice';
import {getPresaleTokens} from './store/slices/currencies-slice';
import {changeFavourites} from './store/slices/currencies-slice';
import {setBrowserWidth} from './store/slices/app-slice';

// import Footer from "./components/Footer";
import Portfolio from "./views/Portfolio";
import PortfolioTokens from "./views/Portfolio/Tokens";
import PortfolioOverview from "./views/Portfolio/Overview";


function App() {

    const dispatch = useDispatch();
    const [isOpen, setOpen] = useState(false);

    const toggleSidebar = () =>{
        // console.log(isOpen);
        setOpen(!isOpen);
    }


    useEffect(()=>{
        
        const getFavourites = () =>{
            let favouriteTokens = JSON.parse(localStorage.getItem('favourites'))||[];        
            dispatch(changeFavourites(favouriteTokens));
        }

        const getRealtimeDatas  =() =>{
            dispatch(getTrendings())
            dispatch(getGainersLosers())
            dispatch(getMostVisited())
            dispatch(getPresaleTokens())
            
        }
        getFavourites();
        getRealtimeDatas();
        
        // setInterval(()=>getRealtimeDatas(),100000);
    },[dispatch])

    useEffect(()=>{
        const setWindowWidth = () => {
            dispatch(setBrowserWidth(window.innerWidth));
        }

        const setSidebarOpenState=()=>{
            if(window.innerWidth<=768){
                setOpen(false);
            }else{
                setOpen(true);
            }
        }

        setWindowWidth();
        setSidebarOpenState();
        window.addEventListener('resize',(e)=>{
            // console.log('dd');
            setWindowWidth();      
        });

    },[dispatch]);

    return ( 
        <Router>
        
            <Sidebar isOpen = {isOpen}  setOpen = {toggleSidebar} />            
            <div className="page-container container-full ">
                <Header setOpen = {toggleSidebar} />    
                <div id="page-content" className={!isOpen?'page-content open':'page-content'}>
                    
                    <Routes>
                        <Route path="/currencies" element={<Ranking />} />
                        <Route path="/trending-tokens" element={<TrendingTokens />} />
                        <Route path="/gainers-losers" element={<GainersLosers />} />
                        <Route path="/chart/:chain/:contractAddress" element={<Chart />} />
                        <Route path="/portfolio" element={<Portfolio />} >
                            <Route path="overview" element={<PortfolioOverview />} />
                            <Route path="tokens" element={<PortfolioTokens />} />                                        
                        </Route>
                        
                        <Route path="/*" element={<Navigate to="/currencies" />} />
                    </Routes>
                    
                  
                    <ScrollToTopButton refId="page-content" />
                </div>
            </div>
        </Router>
    );
}

export default App;
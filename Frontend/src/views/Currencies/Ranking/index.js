
import "../../../style/css/dashboard1.css"
import "../../../style/css/table.css"

import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";

import axios from 'axios';

import {FaRegStar, FaStar} from "react-icons/fa";
import {AiOutlineDollar, AiOutlineBarChart} from "react-icons/ai";

import Skeleton from '@mui/material/Skeleton';

import TrendingMarquee from "../../../components/TrendingMarquee/TrendingMarquee";
import TredingCard from "./MarketCapInfoCard/Treding";
import BestGainersCard from "./MarketCapInfoCard/BestGainers";
import PresaleCard from "./MarketCapInfoCard/Presale";
import useFavoriteHelper from "../../../hooks/useFavoriteHelper";




function Ranking() {

    const ranking = useSelector((state) => state.currencies.ranking);
    const isLoading = useSelector((state) => state.currencies.isLoading);
    const chain = useSelector((state) => state.network.name);
    const scanurl = useSelector((state) => state.network.scanurl);

    const {toggleFavouriteToken, isFavourite} = useFavoriteHelper();

    const [globalMetrics, setGlobalMetrics] = useState(null);

    useEffect(()=>{
        getGlobalMetrics();
    },[])

    const getGlobalMetrics = () =>{
        axios.get(`${process.env.REACT_APP_DOMAIN_URL}/coin-market-cap/global-metrics`)
            .then(function (response) {
                const res = response.data;
                if(res.quote){
                    setGlobalMetrics({
                        total_market_cap:res.quote.USD.total_market_cap,
                        total_change:res.quote.USD.total_market_cap_yesterday_percentage_change
                    })
                }                
                
            })
            .catch(function (error) {
                console.log(error);
            }).finally(()=>{
        });   
    }

    return ( 
        <>
            <div className="row ">
                <div className="col-md-12 d-flex ">
                    <TrendingMarquee />    
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 ">

                    <div className="composition-image mt-3 composition-back1" >
                        <a href="https://a-ads.com/"  target="_blank">
                            <img src="../../../assets/images/compositions/composition_1.png " alt="composition" />
                        </a>
                    </div>
                    <div className="composition-footer d-flex justify-content-between ">
                        <div className="composition-title ">
                            When to invest in crypto?
                        </div>
                        <div className="composition-ads ">
                            <a href="#">Ads</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 ">
                    <div className="composition-image mt-3  composition-back2">
                        <a href="https://a-ads.com/"  target="_blank">
                            <img src="../../../assets/images/compositions/composition_2.png " alt="composition" />
                        </a>
                    </div>
                    <div className="composition-footer d-flex justify-content-between ">
                        <div className="composition-title ">
                            Crypto in 2022
                        </div>
                        <div className="composition-ads ">
                            <a href="#">Ads</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 ">
                    <div className="composition-image mt-3  composition-back3">
                        <a href="#"  target="_blank">
                            <img src="../../../assets/images/compositions/composition_3.png " alt="composition" />
                        </a>
                    </div>
                    <div className="composition-footer d-flex justify-content-between ">
                        <div className="composition-title ">
                            Will BTC recover?
                        </div>
                        <div className="composition-ads ">
                            <a href="#">Ads</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-5 ">
                <div className="col-md-12 ">
                    <div className="coin-martketcap-intro-title ">
                        Today's Cryptocurrency Prices by Market Cap<br />
                        <small className="d-flex align-items-center flex-wrap">
                            The global crypto market cap is {
                                globalMetrics == null?
                                <Skeleton className="ml-1" animation="wave" width={50} height={30} />:
                                <span className="text-success ml-1">${(globalMetrics.total_market_cap/Math.pow(10,12)).toFixed(2)}T</span>
                    
                            }, a 
                            {
                                globalMetrics == null?
                                <><Skeleton className="ml-1" animation="wave" width={50} height={30}/>%</>:
                                <span className={globalMetrics.total_change>0?"text-success ml-1":"text-danger ml-1"}>{globalMetrics.total_change.toFixed(2)}%</span>
                            }
                             &nbsp;change over the last day.
                        </small>
                    </div>
                </div>
            </div>
            <div className="row mt-3 ">
                <div className="col-md-4 ">
                    <TredingCard />
                </div>
                <div className="col-md-4 ">
                    <BestGainersCard />
                </div>
                <div className="col-md-4 ">
                    <PresaleCard />
                </div>
            </div>
            <div className="row mt-3 ">
                <div className="col-md-12"  style={{width:'100%', overflowX:'auto', textAlign:'center'}}>
                    {
                        isLoading&&(
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col " className="text-left ">#</th>
                                        <th scope="col " className="text-left ">Name</th>
                                        <th scope="col " className="text-left ">Price</th>
                                        <th scope="col " className="text-right ">24h %</th>
                                        <th scope="col " className="text-right ">7d %</th>
                                        <th scope="col " className="text-right">
                                            Marketcap <big><AiOutlineDollar className="ml-1" /></big>
                                        </th>
                                        <th scope="col " className="text-right d-flex align-items-center">
                                            Volume(24) <big><AiOutlineBarChart className="ml-1" /></big>
                                        </th>
                                        <th scope="col " className="text-right ">Chart</th>

                                    </tr>
                                </thead>
                                <tbody>
                                 {
                                        new Array(50).fill(0).map((t,i)=>{
                                            return (<tr key={i}>
                                                <td className="text-left td-no">{i+1}</td>                                                
                                                <td colSpan="7"><Skeleton animation="wave" width="100%" height={30} /></td>
                                                
                                            </tr>);
                                        })
                                    }
                                </tbody>
                            </table>
                        )
                    }
                    {
                        !isLoading&&(
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col " className="text-left ">#</th>
                                        <th scope="col " className="text-left ">Name</th>
                                        <th scope="col " className="text-left ">Price</th>
                                        <th scope="col " className="text-right ">24h %</th>
                                        <th scope="col " className="text-right ">7d %</th>
                                        <th scope="col " className="text-right">
                                            Marketcap <big><AiOutlineDollar className="ml-1" /></big>
                                        </th>
                                        <th scope="col " className="text-right d-flex align-items-center">
                                            Volume(24) <big><AiOutlineBarChart className="ml-1" /></big>
                                        </th>
                                        <th scope="col " className="text-right ">Chart</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        ranking.map((t,i)=>{
                                            return (<tr key={i}>
                                                <td className="text-left td-no">
                                                    <div className="d-flex">
                                                        <button 
                                                        className={
                                                            isFavourite(t.contractAddress)?`star-toggle-noline-btn active mr-2 inline-block`:
                                                            `star-toggle-noline-btn mr-2 inline-block`
                                                        }
                                                            onClick={()=>{toggleFavouriteToken({
                                                                contractAddress:t.contractAddress,
                                                                name:t.name,
                                                                symbol:t.symbol,
                                                                chain:chain,
                                                                logo:t.logo?`${scanurl}/token/`+t.logo:`${scanurl}/images/main/empty-token.png`,
                                                            })}}
                                                        >
                                                            {
                                                                isFavourite(t.contractAddress)?<FaStar />:<FaRegStar />
                                                            }
                                                            
                                                        </button>
                                                        {i+1}
                                                    </div>
                                                </td>
                                                <td className="text-strong text-left ">                                                    
                                                    <Link to={ `/chart/${chain}/${t.contractAddress}`}>
                                                        <div className="d-flex align-items-center">
                                                        <img className="ranking-img mr-1" src={t.logo?`${scanurl}/token/`+t.logo:`${scanurl}/images/main/empty-token.png`} alt="t_logo" />
                                                        {t.name} <span className="mark ">                                            
                                                        {t.symbol}</span>
                                                        </div>
                                                    </Link>
                                                    </td>
                                                <td className="text-strong text-left ">${t.price.toFixed(2)}</td>
                                                <td className={parseFloat(t.percent_change_24h)>0?"text-success text-right":"text-danger text-right"}>{t.percent_change_24h}</td>
                                                <td className={parseFloat(t.percent_change_7d)>0?"text-success text-right":"text-danger text-right"}>{t.percent_change_7d}</td>
                                                <td className="text-strong text-right ">{t.market_cap}</td>
                                                <td className="text-strong text-right ">{t.volume_24h}</td>
                                                <td className="chart "> 
                                                    <img className={parseFloat(t.percent_change_7d)>0?"bCltOL isUp":"bCltOL"}  src={`https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/${t.id}.svg`} />
                                                </td>
                                            </tr>);
                                        })
                                    }
                                </tbody>
                            </table>
                        )    
                    }
                    
                </div>
            </div>
        </>
    );
}

export default Ranking;
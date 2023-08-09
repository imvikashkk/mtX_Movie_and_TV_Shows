import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";

import useFetch from "../../../hooks/useFetch";

import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);
    const { data, loading } = useFetch("/movie/upcoming");
    const [placeHolder, setPlaceHolder] = useState("");
    const pH = "Search for a movie or tv show...";
    const currPH = useRef(-1)
    const inFC = useRef()
    const [placeHolderShow, setPlaceHolderShow] = useState("placeHolder")

    useEffect(() => {
        const bg =
            url.backdrop +
            data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg);
    }, [data]);

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
        }
    };

    const searchBtnHandle = ()=>{
        if(query.trim().length > 0){
            navigate(`/search/${query}`);  
        }
    }
   
    
    useEffect(()=>{
        const ss = setInterval(()=>{
            if(pH.length == currPH.current+1){
                currPH.current = -1
                setPlaceHolder("")
            }
            currPH.current += 1;
                setPlaceHolder((prev)=>prev+pH[currPH.current]);
        },300)
        const fcIn =  inFC.current.addEventListener("focusin", (e) => {
            setPlaceHolderShow("placeHolderOff")
        });
        const fcOut =  inFC.current.addEventListener("focusout", (e) => {
            setPlaceHolderShow("placeHolder")
            currPH.current = -1
            setPlaceHolder("")
        });
        return ()=>{
            clearInterval(ss);
            removeEventListener("focusin", fcIn);
            removeEventListener("focusout", fcOut);
        }
    },[])

    return (
        <div className="heroBanner">
            {!loading && (
                <div className="backdrop-img">
                    <Img src={background} />
                </div>
            )}

            <div className="opacity-layer"></div>
            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">Welcome.</span>
                    <span className="subTitle">
                        Millions of movies, TV shows and people to discover.
                        Explore now.
                    </span>
                    <div className="searchInput">
                        <input
                            type="text"
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                            ref={inFC}
                            id="inFC"
                            name="inFC"
                        />
                        <label htmlFor="inFC" className={placeHolderShow}>{placeHolder}</label>
                        <button onClick={searchBtnHandle}>Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default HeroBanner;

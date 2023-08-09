import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/logo_icon.png";
import { FaHome } from "react-icons/fa";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=>{
    window.scrollTo(0, 0);
  }, [location])

  const controlNavBar = () =>{
    if(window.scrollY > 220){
        if(window.scrollY > lastScrollY && !mobileMenu){
            setShow("hide")
        }
        else{ // window.scrollY < lastScrollY
            setShow("show");
        }
        setLastScrollY(window.scrollY);
    }
    else{
        setShow("top");
        setLastScrollY(window.scrollY);
    }
  }

  useEffect(()=>{
    window.addEventListener("scroll", controlNavBar);
    return ()=>{
        window.removeEventListener("scroll", controlNavBar);
    }
  }, [lastScrollY])

  const handleOpenSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const handleOpenMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const searchQueryHandle = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      const sss = setTimeout(() => {
        setShowSearch(false);
      }, 1000);
      return () => {
        clearTimeout(sss);
      };
    }
  };

  const navigationHandler = (type) =>{
        if(type==="movie"){
            navigate("/explore/movie")
        }else{ // tvshow
            navigate("/explore/tv")
        }
        setMobileMenu(false);
  }
  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <a className="logo" href="https://github.com/imvikashkk/mtX_Movie_and_TV_Shows" target="_blank">
          <img src={logo} alt="" className="logoImg"/>
          <span className="logoText">mtX</span>
        </a>
        <ul className="menuItems">
          <li className="menuItem"><FaHome onClick={()=>navigate("/")} /></li>
          <li className="menuItem" onClick={(e)=>navigationHandler("movie")}>Movies</li>
          <li className="menuItem" onClick={(e)=>navigationHandler("tvshow")}>TV Shows</li>
          <li className="menuItem"><HiOutlineSearch onClick={handleOpenSearch}/></li>
        </ul>

        <div className="mobileMenuItems">
          <FaHome onClick={()=>navigate("/")} />
          <HiOutlineSearch onClick={handleOpenSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={handleOpenMobileMenu} />
          )}
        </div>
        
      </ContentWrapper>
      {
        showSearch ? (
            <div className="searchBar">
        <ContentWrapper>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or tv show..."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandle}
            />
            <VscChromeClose onClick={() => setShowSearch(false)} />
          </div>
        </ContentWrapper>
      </div>
        )
        :null
      }
    </header>
  );
};

export default Header;

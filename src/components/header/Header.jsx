import { Wrapper } from '../../pages/index'
import { useEffect, useState } from "react";
import "./style.scss"
import { useLocation, useNavigate } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";

function Header() {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState("");
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location])

    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setShow("hide")
            } else {
                setShow("show");
            }
        } else {
            setShow("top")
        }
        setLastScrollY(window.scrollY)
    }

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar)
        }
    }, [lastScrollY])

    const searchQueryHandler = (e) => {
        if (e.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`)
            setTimeout(() => {
                setShowSearch(false)
            }, 1000)
        }

    }

    const openSearch = () => {
        setMobileMenu(false)
        setShowSearch(true)
    }

    const openMobileMenu = () => {
        setMobileMenu(true);
        setShowSearch(false)
    }

    const navigationHandler = (type) => {
        if (type === "movie") {
            navigate("/explore/movie")
        } else {
            navigate("/explore/tv")
        }
        setMobileMenu(false)
    }


    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
            <Wrapper>
                <div
                    className='logo'
                    onClick={() => navigate("/")}
                >
                    MW
                </div>
                <ul className='menuItems'>
                    <li
                        className='menuItem'
                        onClick={() => navigationHandler("movie")}
                    >
                        Movies
                    </li>
                    <li
                        className='menuItem'
                        onClick={() => navigationHandler("tv")}
                    >
                        TV shows
                    </li>
                    <li
                        className='menuItem'
                    >
                        <HiOutlineSearch onClick={openSearch} />
                    </li>
                </ul>
                {/* Mobile Button */}
                <div className="mobileMenuItems">
                    <HiOutlineSearch onClick={openSearch} />
                    {mobileMenu ? (
                        <VscChromeClose
                            onClick={() => setMobileMenu(false)}
                        />
                    ) : (
                        <SlMenu
                            onClick={openMobileMenu}
                        />
                    )}
                </div>
            </Wrapper>

            {showSearch && (
                <div className="searchBar">
                    <Wrapper>
                        <div className="searchInput">
                            <input
                                type="text"
                                placeholder='Search for a movie or tv shows...'
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyUp={searchQueryHandler}
                            />
                            <VscChromeClose
                                onClick={() => setShowSearch(false)}
                            />
                        </div>
                    </Wrapper>
                </div>
            )}
        </header>
    )
}

export default Header;

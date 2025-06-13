"use client"

import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import { Link as ScrollToLink, animateScroll as scroll } from "react-scroll"
import CssBaseline from "@mui/material/CssBaseline"
import useScrollTrigger from "@mui/material/useScrollTrigger"
import Box from "@mui/material/Box"
import Fab from "@mui/material/Fab"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import Fade from "@mui/material/Fade"
import logo_black from "../../assets/Logo_black.png"
import {
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
  useMediaQuery,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { groceryContext } from "../Layout/Layout"
import { ShoppingCartRounded } from "@mui/icons-material"
import SuccessAlert from "../SuccessAlert/SuccessAlert"
import LanguageSelector from "../LanguageSelector/LanguageSelector"
import { useLanguage } from "../../contexts/LanguageContext"

// Agregar este componente antes del componente Navbar
const CartBadge = () => {
  const { cartItemsState } = React.useContext(groceryContext)
  const [cartItems] = cartItemsState
  const [prevCount, setPrevCount] = React.useState(0)
  const [animate, setAnimate] = React.useState(false)

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

  React.useEffect(() => {
    if (totalItems !== prevCount) {
      setAnimate(true)
      setPrevCount(totalItems)
      const timer = setTimeout(() => setAnimate(false), 300)
      return () => clearTimeout(timer)
    }
  }, [totalItems, prevCount])

  if (totalItems === 0) return null

  return (
    <div
      className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center font-bold transition-all duration-300 ${
        animate ? "scale-125 bg-red-600" : "scale-100"
      }`}
      style={{
        boxShadow: "0 2px 8px rgba(239, 68, 68, 0.4)",
        animation: animate ? "pulse 0.3s ease-in-out" : "none",
      }}
    >
      {totalItems > 99 ? "99+" : totalItems}
    </div>
  )
}

// This function will add Go_back feature on the Navbar
function ScrollTop(props) {
  const { children, window } = props
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  })

  // Go_back to the top Button Handler
  const handleClick = () => {
    scroll.scrollToTop({
      duration: 500,
      smooth: true,
    })
  }
  return (
    <Fade in={trigger}>
      <Box onClick={handleClick} role="presentation" sx={{ position: "fixed", bottom: 20, right: 16 }}>
        {children}
      </Box>
    </Fade>
  )
}

// This function will show a Elevation effect on the Navbar when scrolling
function ElevationScroll(props) {
  const { children, window } = props
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  })
}

const Links = ({ drawer, setIsOpenDrawer, isOpenDrawer }) => {
  const location = useLocation()
  const { pathname } = location
  const { t } = useLanguage()

  // This class will create Link Obj
  class LinkClass {
    constructor(id, linkName, translationKey) {
      this.id = id
      this.linkName = linkName
      this.translationKey = translationKey
    }
  }

  const pageLink = [
    new LinkClass(0, t("nav.home"), "nav.home"),
    new LinkClass(1, t("nav.about"), "nav.about"),
    new LinkClass(2, t("nav.categories"), "nav.categories"),
  ]
  const componentsLink = [
    new LinkClass("services", t("nav.services"), "nav.services"),
    new LinkClass("footer", t("nav.contact"), "nav.contact"),
  ]

  return drawer ? (
    <List sx={{ mt: 1.5 }}>
      {pageLink.map((link) => (
        <Link
          to={`/${
            link.linkName.toLowerCase() === t("nav.home").toLowerCase()
              ? "home"
              : link.linkName.toLowerCase() === t("nav.about").toLowerCase()
                ? "about"
                : "categories"
          }`}
          key={link.id}
        >
          <ListItem sx={{ minWidth: "12rem" }} disablePadding>
            <ListItemButton onClick={() => setIsOpenDrawer(!isOpenDrawer)} sx={{ ":hover": { bgcolor: "#E0F3D7" } }}>
              <ListItemText sx={{ marginLeft: "0.4rem" }} primary={link.linkName} />
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
      {componentsLink.map((link, i) => (
        <ScrollToLink to={link.id} key={i} smooth={true} spy={true} offset={-70} duration={80}>
          <ListItem
            disabled={link.id !== "footer" && pathname !== "/" && pathname !== "/home"}
            key={i}
            sx={{ minWidth: "12rem" }}
            disablePadding
          >
            <ListItemButton onClick={() => setIsOpenDrawer(!isOpenDrawer)} sx={{ ":hover": { bgcolor: "#E0F3D7" } }}>
              <ListItemText sx={{ marginLeft: "0.4rem" }} primary={link.linkName} />
            </ListItemButton>
          </ListItem>
        </ScrollToLink>
      ))}

      {/* Language Selector in Drawer */}
      <ListItem sx={{ minWidth: "12rem", justifyContent: "center" }} disablePadding>
        <LanguageSelector />
      </ListItem>
    </List>
  ) : (
    <ul className={`flex p-0 sm:space-x-8 space-x-5 text-black items-center`}>
      {pageLink.map((li) => (
        <Link
          to={`/${
            li.linkName.toLowerCase() === t("nav.home").toLowerCase()
              ? "home"
              : li.linkName.toLowerCase() === t("nav.about").toLowerCase()
                ? "about"
                : "categories"
          }`}
          key={li.id}
        >
          <li className="sm:text-base hover:text-gray-800 hover:scale-[0.99] text-sm transition-all duration-200 cursor-pointer">
            {li.linkName}
          </li>
        </Link>
      ))}
      {componentsLink.map((link, i) => (
        <li
          key={i}
          className={`sm:text-base ${
            link.id !== "footer" && pathname !== "/" && pathname !== "/home" ? "hidden" : "block"
          } hover:text-gray-800 transition-all duration-500 hover:scale-[0.99] text-sm cursor-pointer`}
        >
          <ScrollToLink to={link.id} activeClass="active" smooth={true} spy={true} offset={-70} duration={500}>
            {link.linkName}
          </ScrollToLink>
        </li>
      ))}

      {/* Language Selector in Desktop Menu */}
      <li>
        <LanguageSelector />
      </li>
    </ul>
  )
}

export const userLoggedIn = JSON.parse(sessionStorage.getItem("userLoggedIn"))

const Navbar = (props) => {
  const [isNavBarElevated, setIsNavbarElevated] = React.useState(false)
  const [isOpenDrawer, setIsOpenDrawer] = React.useState(false)
  const { t } = useLanguage()

  // Media Query
  const isExtraSmallScreen = useMediaQuery("(max-width: 664px)")
  const isSemiMediumScreen = useMediaQuery("(max-width: 900px)")
  const isLargeScreen = useMediaQuery("(max-width:1280px)")

  // This function will change the navBar bg-color when user scrolls
  window.addEventListener("scroll", () => {
    setIsNavbarElevated(window.scrollY > 0)
  })
  React.useEffect(() => {
    setIsNavbarElevated(window.pageYOffset > 0)
  }, [])

  const navigate = useNavigate()
  const { userLoggedInState } = React.useContext(groceryContext)
  const [isUserLoggedIn, setIsUserLoggedIn] = userLoggedInState

  const [openAlert, setOpenAlert] = React.useState(false)

  // Log out button handler
  const handleLogOut = () => {
    setIsUserLoggedIn(false)
    setOpenAlert(!openAlert)
    sessionStorage.setItem("userLoggedIn", JSON.stringify(false))
  }

  return (
    <>
      <SuccessAlert state={[openAlert, setOpenAlert]} massage={t("login.logoutSuccess")} />

      <nav className="fixed z-50">
        <CssBaseline />
        <ElevationScroll {...props}>
          <AppBar
            sx={{
              bgcolor: isNavBarElevated ? "white" : "transparent",
              transition: "all 150ms ease-in-out",
            }}
          >
            <Toolbar>
              <Container disableGutters={isLargeScreen} sx={{ display: "flex", px: isLargeScreen ? 0.5 : 0 }}>
                {/* Open Drawer Btn */}
                {isSemiMediumScreen && (
                  <IconButton
                    color="black"
                    aria-label="open drawer"
                    onClick={() => setIsOpenDrawer(!isOpenDrawer)}
                    edge="start"
                    sx={{ mr: 1 }}
                  >
                    <MenuIcon fontSize="inherit" />
                  </IconButton>
                )}

                <div className="flex w-full justify-between items-center">
                  {/* Brand_icon */}
                  <Link to={"/home"}>
                    <img
                      className="sm:max-h-6 max-h-5 my-auto cursor-pointer"
                      src={logo_black || "/placeholder.svg"}
                      alt="grocery"
                    />
                  </Link>

                  <div className="flex items-center space-x-8">
                    {/* Links */}
                    {isSemiMediumScreen ? (
                      <Drawer anchor={"left"} open={isOpenDrawer} onClose={() => setIsOpenDrawer(!isOpenDrawer)}>
                        <Links setIsOpenDrawer={setIsOpenDrawer} isOpenDrawer={isOpenDrawer} drawer={true} />
                      </Drawer>
                    ) : (
                      <Links setIsOpenDrawer={setIsOpenDrawer} isOpenDrawer={isOpenDrawer} />
                    )}
                    <div className="sm:space-x-8 space-x-5 flex items-center">
                      {/* Go to cart btn */}
                      <Tooltip title={t("nav.cart")}>
                        <span>
                          <IconButton
                            onClick={() => navigate("/cart")}
                            sx={{
                              textTransform: "capitalize",
                              position: "relative",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                transform: "scale(1.1)",
                              },
                            }}
                            color="warning"
                          >
                            <ShoppingCartRounded fontSize="inherit" />
                            {/* Cart Counter Badge */}
                            <CartBadge />
                          </IconButton>
                        </span>
                      </Tooltip>

                      {
                        // Log in Btn
                        !isUserLoggedIn ? (
                          <Button
                            onClick={() => navigate("/login")}
                            size={isExtraSmallScreen ? "small" : "medium"}
                            sx={{ textTransform: "capitalize" }}
                            color="success"
                            variant="contained"
                          >
                            {t("nav.login")}
                          </Button>
                        ) : (
                          // Log out Btn
                          <Button
                            size={isExtraSmallScreen ? "small" : "medium"}
                            onClick={handleLogOut}
                            sx={{ textTransform: "capitalize" }}
                            color="success"
                            variant="contained"
                          >
                            {t("nav.logout")}
                          </Button>
                        )
                      }
                    </div>
                  </div>
                </div>
              </Container>
            </Toolbar>
          </AppBar>
        </ElevationScroll>
        <Toolbar id="back-to-top-anchor" />

        {/* Go_Back on the top btn */}
        <ScrollTop {...props}>
          <Fab color="warning" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </nav>
    </>
  )
}

export default Navbar

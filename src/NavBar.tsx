import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, AppBar, Drawer } from "@mui/material";
import {
  Home,
  List,
  PlayArrow,
  PlaylistAdd,
  SportsHockey,
  Menu,
} from "@mui/icons-material";
import theme from "./theme";

/*const linkStyle = {
  color: theme.palette.text.primary,
  textDecoration: "none",
  fontWeight: "bold",
};*/

type NavItem = {
  name: string;
  link: string;
  icon: any;
};

export default function NavBar() {
  const [showNavItems, setShowNavItems] = useState<boolean>(true);
  const [drawerMenuOpen, setDrawerMenuOpen] = useState<boolean>(false);

  const navList: Array<NavItem> = [
    { name: "Home", link: "/", icon: <Home /> },
    { name: "Season", link: "/season", icon: <List /> },
    { name: "Schedule Season", link: "/scheduleSeason", icon: <PlaylistAdd /> },
    { name: "Start Game", link: "/startGame", icon: <PlayArrow /> },
    { name: "Teams", link: "/teams", icon: <List /> },
  ];

  function NavItems() {
    return (
      <Box display="flex" flexDirection="row">
        {navList.map((navItem: NavItem) => (
          <Box padding={1} marginRight={1}>
            <Link
              to={navItem.link}
              style={{
                color: theme.palette.text.primary,
                textDecoration: "none",
                fontWeight: "bold",
                /*"&:hover": {
                  color: theme.palette.text.secondary,
                },*/
              }}
            >
              <Box display="flex" flexDirection="row" marginRight={2}>
                {navItem.icon}
                <Box marginLeft={1}>{navItem.name}</Box>
              </Box>
            </Link>
          </Box>
        ))}
        {/* <Box padding={1} marginRight={1}>
          <Link
            to="/"
            style={{
              color: theme.palette.text.primary,
              textDecoration: "none",
              fontWeight: "bold",

            }}
          >
            <Box display="flex" flexDirection="row" marginRight={2}>
              <Home />
              <Box marginLeft={1}>Home</Box>
            </Box>
          </Link>
        </Box>
        <Box padding={1} marginRight={1}>
          <Link
            to="/season"
            style={{
              color: theme.palette.text.primary,
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            <Box display="flex" flexDirection="row" marginRight={2}>
              <List />
              <Box marginLeft={1}>Season</Box>
            </Box>
          </Link>
        </Box>
        <Box padding={1} marginRight={1}>
          <Link
            to="/scheduleSeason"
            style={{
              color: theme.palette.text.primary,
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            <Box display="flex" flexDirection="row" marginRight={2}>
              <PlaylistAdd />
              <Box marginLeft={1}>Schedule Season</Box>
            </Box>
          </Link>
        </Box>
        <Box padding={1} marginRight={1}>
          <Link
            to="/startGame"
            style={{
              color: theme.palette.text.primary,
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            <Box display="flex" flexDirection="row" marginRight={2}>
              <PlayArrow />
              <Box marginLeft={1}>Start Game</Box>
            </Box>
          </Link>
        </Box>
        <Box padding={1} marginRight={1}>
          <Link
            to="/teams"
            style={{
              color: theme.palette.text.primary,
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            <Box display="flex" flexDirection="row" marginRight={2}>
              <SportsHockey />
              <Box marginLeft={1}>Teams</Box>
            </Box>
          </Link>
        </Box> */}
      </Box>
    );
  }

  useEffect(() => {
    setShowNavItems(window.innerWidth > 1200);
  }, [window.innerWidth]);

  return (
    <>
      <Box>
        <AppBar position="static">
          <Box display="flex" flexDirection="row" paddingLeft={2}>
            {/* <- if the screen is wide enough show nav items. if not show hamburger menu */}
            {showNavItems ? (
              <NavItems />
            ) : (
              <Box
                padding={1}
                onClick={() => {
                  setDrawerMenuOpen(true);
                }}
              >
                <Menu />
              </Box>
            )}
          </Box>
        </AppBar>
      </Box>
      <Drawer
        open={drawerMenuOpen}
        onClose={() => {
          setDrawerMenuOpen(false);
        }}
      >
        <NavItems />
      </Drawer>
    </>
  );
}

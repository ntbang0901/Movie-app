import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import { signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { auth } from "../configs/firebase";
import SearchBox from "./SearchBar";

const pages = [{ name: "Trang chủ", to: "/" }];
const settings = [
  { name: "Logout", fuc: async () => signOut(auth) },
  { name: "Trang chủ" },
  ,
];

const StyledUserAvatar = styled(Avatar)`
  border: 2px solid #02e7f5;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const StyledAppBar = styled(AppBar)`
  position: fixed;
  top: 0;
  z-index: 50;
  transition: all 0.5s;

  .active {
    color: #02e7f5;
    font-family: "Work Sans";
    font-style: normal;
    font-weight: 700;
  }
`;

function NavbarHeader() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [loggedInUser, _loading, _error] = useAuthState(auth);

  const router = useRouter();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  console.log(loggedInUser?.photoURL);

  return (
    <StyledAppBar
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        backgroundImage: `linear-gradient(rgba(14,16,18,1), rgba(14,16,18,0))`,
      }}
      position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href={"/"}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}>
              <Image
                src={logo}
                alt="logo"
                height={50}
                style={{ marginBottom: "16px" }}
              />
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}>
              {pages.map((page, index) => (
                <MenuItem key={page.name + index} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}>
            <Image
              src={logo}
              alt="logo"
              height={50}
              style={{ marginBottom: "16px" }}
            />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link href={page.to} key={page.name} passHref>
                <Button
                  className={router.asPath === page.to ? "active" : ""}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    fontSize: "16px",
                  }}>
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>
          <SearchBox />

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <StyledUserAvatar
                  alt="Remy Sharp"
                  src={loggedInUser?.photoURL as string}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              {settings.map((setting) => {
                return (
                  <MenuItem
                    key={setting?.name}
                    onClick={setting?.fuc || handleCloseUserMenu}>
                    <Typography textAlign="center">{setting?.name}</Typography>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
}
export default NavbarHeader;

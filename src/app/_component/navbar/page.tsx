// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
// import Link from 'next/link';

// const pages = ['Log in', 'Register',"Home","profile"];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

// export default function Navbar() {
//   const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
//   const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

//   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   return (
//     <AppBar position="static">
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href="#"
//             sx={{
//               mr: 2,
//               display: { xs: 'none', md: 'flex' },
//               fontWeight: 700,
//               letterSpacing: '.1rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             OB Media
//           </Typography>

//           <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: 'block', md: 'none' },
//               }}
//             >
//               {pages.map((page) => (
//                 <MenuItem key={page} onClick={handleCloseNavMenu}>
//                   <Link href={page === 'Log in' ? '/Login' : '/Register'}>
//                     {page}
//                   </Link>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             href="#"
//             sx={{
//               mr: 2,
//               display: { xs: 'flex', md: 'none' },
//               flexGrow: 1,
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             OB Media
//           </Typography>
//           <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//             {pages.map((page) => (
//               <Button
//                 key={page}
//                 onClick={handleCloseNavMenu}
//                 sx={{ my: 2, color: 'white', display: 'block' }}
//               >
//                 <Link href={page === 'Log in' ? '/Login' : '/Register'}>
//                   {page}
//                 </Link>
//               </Button>
//             ))}
//           </Box>

//           <Box sx={{ flexGrow: 0 }}>
//             <Tooltip title="Open settings">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
//               </IconButton>
//             </Tooltip>
//             <Menu
//               sx={{ mt: '45px' }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               {settings.map((setting) => (
//                 <MenuItem key={setting} onClick={handleCloseUserMenu}>
//                   <Typography textAlign="center">{setting}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }
"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { clearData, getToken } from "@/app/redux/slices/loginSlice";
import { usePathname, useRouter } from "next/navigation";
import {
  Avatar,
  Chip,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { getUserData } from "@/app/redux/slices/userInfoSlice";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HomeIcon from "@mui/icons-material/Home";
import Image from 'next/image';
export default function Navbar() {
  const { token } = useSelector((state: RootState) => state.loginSlice);
  const { photo, addImage, loading, name } = useSelector(
    (state: RootState) => state.userInfo
  );

  const [show, setShow] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const { push } = useRouter();
  const pathName = usePathname();
  React.useEffect(() => {
    dispatch(getToken());
  }, [dispatch, token]);

  React.useEffect(() => {
    if (token) {
      dispatch(getUserData());
    }
  }, [token, dispatch, addImage]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className="z-[9999999999999999999999999]" position="fixed">
        <Toolbar className="relative">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
              className="flex justify-start items-center uppercase"
              onClick={() => setShow(false)}
              href={"/"}
            >
                 <Image 
                   src="/logo.png" 
                   alt="Logo" 
                   width={50} 
                   height={50} 
                   className="mr-2 rounded-lg"
                   /> Media

            </Link>
          </Typography>


          <div className={`p-4`}>
            {token ? (
              <>
                {loading ? (
                  <CircularProgress color="inherit" />
                ) : photo ? (
                  <div className="relative">
                    <Chip
                      onClick={() => setShow(!show)}
                      component={Button}
                      className="text-white cursor-pointer"
                      avatar={<Avatar alt="Natacha" src={photo} />}
                      label={name}
                      variant="outlined"
                    />
                    {show && (
                      <List className="absolute overflow-hidden top-[39px] -left-10 shadow bg-mainColor text-white z-[9999999999]">
  <Link href="/">
    <ListItem
      className={`bg-neutral-900`}
      disablePadding
      component="button"
      onClick={() => setShow(false)}
    >
      <ListItemButton className="px-9">
        <ListItemIcon>
          <HomeIcon className="text-white" />
        </ListItemIcon>
        <ListItemText primary="Home" className="text-white" />
      </ListItemButton>
    </ListItem>
  </Link>
  <Link href="/profile">
    <ListItem
      className={`bg-neutral-900`}
      disablePadding
      component="button"
      onClick={() => setShow(false)}
    >
      <ListItemButton className="px-9">
        <ListItemIcon>
          <AccountBoxIcon className="text-white" />
        </ListItemIcon>
        <ListItemText primary="Profile" className="text-white" />
      </ListItemButton>
    </ListItem>
  </Link>
  <Link href="/forgetpass">
    <ListItem
      className={`bg-neutral-900`}
      disablePadding
      component="button"
      onClick={() => setShow(false)}
    >
      <ListItemButton className="px-9">
        <ListItemIcon>
          <ManageAccountsIcon className="text-white" />
        </ListItemIcon>
        <ListItemText primary="Change Password" className="text-white text-lg" />
      </ListItemButton>
    </ListItem>
  </Link>
  <ListItem
    className={`bg-neutral-900`}
    onClick={() => {
      setShow(false);
      dispatch(clearData());
      push("/signin");
    }}
    disablePadding
    component="button"
  >
    <ListItemButton className="px-9">
      <ListItemIcon>
        <LogoutIcon className="text-white" />
      </ListItemIcon>
      <ListItemText primary="LogOut" className="text-white" />
    </ListItemButton>
  </ListItem>
</List>

                    )}
                  </div>
                ) : (
                  name.slice(0, 1).toUpperCase()
                )}
              </>
            ) : (
              <>
                <Button
                  className={`${pathName == "/signin" && "bg-slate-700"}`}
                  onClick={() => setShow(false)}
                  color="inherit"
                >
                  <Link href={"/signin"}>SignIN</Link>
                </Button>
                <Button
                  className={`${pathName == "/signup" && "bg-slate-700"}`}
                  onClick={() => setShow(false)}
                  color="inherit"
                >
                  <Link href={"/signup"}>SignUp</Link>
                </Button>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

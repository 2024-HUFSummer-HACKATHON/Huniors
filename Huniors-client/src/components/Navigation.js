import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

const drawerWidth = '10vw';

function Navigation() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  useEffect(() => {
    axios.get('/api/checktoken')
      .then(response => {
        setIsLoggedIn(response.data.isLoggedIn);
      })
      .catch(error => {
        console.error('로그인 상태 확인 중 오류 발생:', error);
      });
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const list = () => (
    <Box
      sx={{ width: drawerWidth }}
      role="presentation"
      onClick={toggleDrawer}
    >
      <List>
        {['MyPage', '팔', '배', '다리'].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={`/${text.toLowerCase()}`}>
              <ListItemText
                primary={text}
                primaryTypographyProps={{
                  sx: {
                    fontSize: '20px', // 글씨 크기 변경
                    marginTop: 5,
                    color: '#DD761C',
                    fontWeight: 'bold',
                    textAlign: 'center'
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: 80 }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        minWidth="600px"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'white',
        }}
      >
        <Container maxWidth="100vw" minWidth="600px">
          <Toolbar disableGutters>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{ mr: 2, color: '#DD761C' }}
            >
              <MenuIcon />
            </IconButton>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <img src="/images/typo_logo.png" alt="typo_logo" style={{ width: 300 }} />
            </Link>
            <Box sx={{ flexGrow: 1 }} />
            {isLoggedIn ? (                                                 // 로그인 상태일 경우 마이페이지 버튼 표시
              <Link to="/mypage" style={{ textDecoration: 'none' }}>
                <Button sx={{
                  width: 80,
                  marginLeft: 10,
                  border: 2,
                  backgroundColor: '#FDE49E',
                  fontWeight: 'bold',
                  color: '#DD761C',
                  borderColor: '#DD761C',
                  mr: 2
                }}>
                  마이페이지  
                </Button>
              </Link>
            ) : (                                                           // 로그인 상태가 아닐 경우 로그인 버튼 표시
              <Link to="/signin" style={{ textDecoration: 'none' }}>
                <Button variant='outlined' sx={{
                  width: 80,
                  marginLeft: 10,
                  border: null,
                  fontWeight: 'bold',
                  fontSize: '17px',
                  color: '#DD761C',
                  borderColor: '#DD761C',
                  mr: 2
                }}>
                  로그인
                </Button>
              </Link>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            top: '64px',
          },
        }}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
      >
        {list()}
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          marginLeft: drawerOpen ? `${drawerWidth}px` : 0,
          transition: 'margin-left 0.3s',
        }}
      >
      </Box>
    </Box>
  );
}

export default Navigation;

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './App.css'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { RootState } from '@/redux/store'
import { Sidebar, Header, DrawerHeader, Main, Chat } from '@/components'
import { setLocalChats } from "@/redux/chatSlice";

const App = () => {
  const { isSidebarOpen } = useSelector((state: RootState) => state.common);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedChats = localStorage.getItem('previousChats');
    if (storedChats) {
      dispatch(setLocalChats(JSON.parse(storedChats)));
    }
  }, []);

  return (
    <Container
      sx={{
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <Box sx={{ display: 'flex', height: '100%' }}>
        <CssBaseline />
        <Header />
        <Sidebar />
        <Main open={isSidebarOpen}>
          <Box sx={{ display: 'flex', height: 'inherit', flexDirection: 'column', justifyContent: 'space-between' }}>
            <DrawerHeader />
            <Chat />
          </Box>
        </Main>
      </Box>
    </Container>
  )
}

export default App

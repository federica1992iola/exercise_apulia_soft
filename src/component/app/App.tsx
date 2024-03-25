import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '../home/Home'
import Favorites from '../favorites/Favorites'
import { Suspense } from 'react'
import Box from '@mui/material/Box/Box'
import Sidenav from '../sidenav/Sidenav'

export default function App() {
  
  return (
    <>
          <Box component={"main"} sx={{ p: 3}}>
               <Router>
                  <Suspense fallback={<div>Loading ...</div>}>
                  <Sidenav />
                  <Routes>
                    <Route path={'/'} element={<Home />} />  
                    <Route path="/home" element={<Home />} />  
                    <Route path="/favorites" element={<Favorites />} />  
                    <Route path={'*'} element={<Home />} />  
                  </Routes>
                  
                </Suspense>
              </Router>
          </Box>
      
    </>
  )
}

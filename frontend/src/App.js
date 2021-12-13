import React from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'

import Heroes from './views/Heroes/Heroes'
import HeroesAdd from './views/HeroesAdd/HeroesAdd'
import OneHero from './views/oneHeroe/OneHero'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Heroes/>} />
        <Route path='/hero/:slug' element={<OneHero/>} />
        <Route path='/add' element={<HeroesAdd/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

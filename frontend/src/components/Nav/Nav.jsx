import React from 'react'

import { Link } from 'react-router-dom'
import './Nav.css'

const Nav = () =>{
    return (
        <div>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/add'>Add Heroes</Link>
            </nav>
        </div>
    )
}

export default Nav

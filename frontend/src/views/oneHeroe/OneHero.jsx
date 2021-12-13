import { useEffect,useState } from 'react'
import { useParams } from 'react-router'
import Nav from '../../components/Nav/Nav'

import './OneHero.css'

const OneHero = () => {

    const [Hero, setHero] = useState(null)

    const {slug} = useParams()

    useEffect(() => {
        fetch(`http://localhost:5000/${slug}`)
        .then(res => res.json())
        .then(res => {
            setHero(res)})
    },[])

    if(!Hero){
        return <h1>Loeading</h1>
    }

    return (
        <>
            <Nav/>
            <div className='allHeroes'>
                <h1>{Hero.name}</h1>
                <div className="heroe">
                    <h2>{Hero.name}</h2>
                    {Hero.power.map(e => (
                            <h3 key={e}>Power : {e}</h3>
                    ))}
                    <img src={Hero.image} alt="Pas d'image" />
                </div>
            </div>
        </>
    )
}

export default OneHero

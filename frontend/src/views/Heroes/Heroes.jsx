import React from 'react'
import Nav from '../../components/Nav/Nav'
import './Heroes.css'

import { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'

const Heroes = () => {

    const [allHeroes, setAllHeroes] = useState([])
    const [editIndex, setEditIndex] = useState(null)
    const [editPowerIndex, setEditPowerIndex] = useState(null)
    const [editPower, setEditPower] = useState()
    const [editName, setEditName] = useState('')

    useEffect(() => {
        fetch('http://localhost:5000/')
        .then(res => res.json())
        .then(res => {
            setAllHeroes(res)})
    },[])

    const handleDelete = slug => {

        fetch(`http://localhost:5000/delete/${slug}`, {
            method : 'DELETE',
            headers: {
                "Content-Type": "application/json"
              }
            })
            .then(res => res.json())
            .then(res => setAllHeroes(res))
    }

    const handlePutPowers = slug => {

        const newPower = {
            power : editPower
        }

        fetch(`http://localhost:5000/${slug}/powers`, {
            method : 'PUT',
            headers: {
                "Content-Type": "application/json"
              },
              body : JSON.stringify(newPower)
            })
            .then(res => res.json())
            .then(res => setAllHeroes(res))
            
        setEditPowerIndex(null)
    }

    const handleDeletePower = (slug,power) => {

        fetch(`http://localhost:5000/delete/${slug}/${power}`, {
            method : 'DELETE',
            headers: {
                "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(res => setAllHeroes(res))
    }

    const handleSubmitModif = (e, slug) => {

        e.preventDefault()

        const newName = {
           name : editName
        }
 
        fetch(`http://localhost:5000/${slug}`, {
            method : 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newName)
        })
        .then(res => res.json())
        .then(res => setAllHeroes(res))
        
        setEditIndex(null)
    }

    const handleChangeName = e => {
        setEditName(e.target.value)
    }

    const handleCancelChange = () => {
        setEditIndex(null)
    }

    const handleSetIndex = id => {
        setEditIndex(id)
    }

    const handlePowerChange = e => {
        setEditPower(e.target.value)
        console.log(editPower);
    }

    const handleEditPowerIndex= id =>{
        setEditPowerIndex(id)
    }

    if(!allHeroes){
        return <h1>Loeading</h1>
    }

    return (
        <>
            <Nav/>

            <div className="allHeroes">
                {allHeroes.map((e, i) => (
                    <>
                        <Link to={`/hero/${e.slug}`} style={{marginTop : '1%', width : '100%' , display : 'flex', justifyContent : 'center',  textDecoration : 'none'}}> <button style={{width : '15%',backgroundColor : 'blueviolet', color : 'white'}}>View</button> </Link>
                        {editIndex !== i ? ( 
                            <div className="heroe" key={e.name + e.slug}>
                                <h2>{e.name}</h2>
                                    {editPowerIndex !== i ? (
                                        <>
                                            {e.power.map(power => (
                                                <>
                                                    <h3 key={power}> Power : {power}</h3>
                                                    <button style={{width : '5%', backgroundColor : 'red', color : 'white'}} onClick={() => handleDeletePower(e.slug,power)}>Delete Power</button>
                                                </>
                                            ))}
                                            <button onClick={() => handleEditPowerIndex(i)}>Modify Power</button>
                                        </>
                                    ) : (
                                        <>
                                            <input type="text" onChange={ e => {handlePowerChange(e)}}/>
                                            <button onClick={() => {handlePutPowers(e.slug)}}>Confirm</button>
                                            <button onClick={() => handleEditPowerIndex(null)}>Cancel</button>
                                        </>
                                    )}
                                <img src={e.image} alt="Pas d'image" />
                                <button onClick={() => handleDelete(e.slug)}>Delete</button>
                                <button onClick={() => handleSetIndex(i)}>Modify</button>
                            </div>
                        ) : (
                            <form className="heroe" key={e.name + e.slug} 
                                onSubmit={event => {
                                    handleSubmitModif(event,e.slug)
                                }} key={e.slug}>
                                <input type="text" onChange={ e => {handleChangeName(e)}} />
                                <ul>
                                {e.power.map(e => (
                                    <h3 key={e}>Power : {e}</h3>
                                ))}
                                </ul>
                                <img src={e.image} alt="Pas d'image" />
                                <button onClick={() => handleCancelChange()}>Cancel</button>
                                <button type='submit'>Validate</button>
                            </form>
                    )}
                </> 
            ))}            
        </div>
        </>
    )
}

export default Heroes
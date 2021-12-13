import React from 'react'
import Nav from '../../components/Nav/Nav'

import { useState } from 'react'

const HeroesAdd = () => {
    
    const [name, setName] = useState('')
    const [age, setAge] = useState(0)
    const [power, setPower] = useState([])
    const [isAlive, setIsAlive] = useState(true)

    const handleSubmit = e => {
        e.preventDefault()
        
        alert("Your heroes been added")

        const newHeroe = {
            slug : name.toLocaleLowerCase(),
            name : name,
            age : age,
            power : [power],
            isAlive : isAlive
        }

        console.log(newHeroe.power);

        fetch('http://localhost:5000/',{
            method : 'POST',
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify(newHeroe)
        })
        .then(res => {
            if(res.status === 406){
                alert(`Error ${res.status} this students already exist`)
            } 
            else {
                res.json()
            }
        })
        setName('')
        setPower([])
    }

    const handleNameChange = e => {
        setName(e.target.value)
    }
    const handleAgeChange = e => {
        setAge(e.target.value)
        
    }
    const handleIsAliveChnage = e => {
        if(e.target.value  === true || e.target.value === false){
            setIsAlive(e.target.value)
        }
    }
    const handlePowerChange = e => {
        setPower(e.target.value)
    }

    return (
        <div>
            <Nav/>

            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleNameChange} value={name} placeholder='Your Name'/>
                <input type="number" onChange={handleAgeChange} placeholder='Your age'/>
                <input type="text" onChange={handlePowerChange} placeholder='His power'/>
                <select name="gotStage" id="stage-status-select" onChange={handleIsAliveChnage}>
                    <option value="">Est-il en vie ?</option>
                    <option value={false}>Oui</option>
                    <option value={true}>Non</option>
                </select>
                <button type='submit'>Envoyer</button>   
            </form>

        </div>
    )
}

export default HeroesAdd

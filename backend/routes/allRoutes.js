const express = require("express")
const app = express()
let heroes = require('../heroes.json')

// ************** Routes Get ***************

const CheckHeroes = (req,res,next) => {

    const {slug} = req.params
    
    if(heroes.find(e => e.slug === slug)){
        res.status(406).send('Nah this heroe already exist')
    }
    else{
        next()
    }
}

const ReverseCheckedHero = (req,res,next) => {
    const {slug} = req.params
    if(heroes.find(e => e.slug === slug)){
        next()
    }
    else{
        res.status(404).send('Hero Not Found !!')
    }
}

app.get("/", (req,res) => {
    console.log(heroes);
    res.status(200).send(heroes)
})

app.get("/:slug", ReverseCheckedHero ,(req,res) => {
    const {slug} = req.params
    const oneHeroe = heroes.find(e => e.slug === slug)
    res.send(oneHeroe)
})

app.get("/:slug/powers" , ReverseCheckedHero ,(req,res) => {
    const {slug} = req.params
    const oneHeroe = heroes.find(e => e.slug === slug)
    res.send(oneHeroe.power)
})

// ************** Routes Post ***************

app.post('/', CheckHeroes,(req,res) => {

    const newHeroe = {
        ...req.body
    }
        res.status(200).send("Added successfull")
        heroes = [...heroes, newHeroe]
        res.send(heroes).status(200)

    // res.status(406).send('This heroes does exist')
})

// ************** Routes Delete ***************

app.delete('/delete/:slug', ReverseCheckedHero, (req,res) => {

    const {slug} = req.params

    const newId = heroes.findIndex(e => e.slug === slug)

    heroes.splice(newId,1)

    res.send(heroes)
})

app.delete('/delete/:slug/:power' , ReverseCheckedHero, (req,res) => {

    const {slug, power} = req.params


    const oneHero = heroes.find( e => e.slug === slug)
    const newPower = oneHero.power.find(e => e === power)

    if(newPower){
        oneHero.power.splice(newPower,1)
        res.send(heroes).status(200)
    }
    else{
        res.status(404).send('Not Found')
    }

})

// ************** Routes Put ***************

app.put('/:slug/powers', (req,res) => {

    const {slug} = req.params
    
    const newPowers = req.body.power

    const findHero = heroes.find(e => e.slug === slug)
    
    if(findHero){
        findHero.power = [...findHero.power, newPowers]
        res.status(200).send(heroes)
        console.log(heroes);
    }
    else{
        res.status(404).send("Heroe Not found")
    }    
})

app.put('/:slug', (req,res) => {

    const {slug} = req.params
    
    const newName = req.body.name

    const findHero = heroes.find(e => e.slug === slug)

    if(findHero){
        findHero.name = newName
        res.status(200).json(heroes)
    }
    else{
        res.status(404).send("Heroe Not found")
    }    
})


module.exports = app
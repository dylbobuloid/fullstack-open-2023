const express = require('express')
const app = express()

app.use(express.json())

let persons =
    [
        {
            "id": "1",
            "name": "Arto Hellas",
            "number": "040-123456"
        },
        {
            "id": "2",
            "name": "Ada Lovelace",
            "number": "39-44-5323523"
        },
        {
            "id": "3",
            "name": "Dan Abramov",
            "number": "12-43-234345"
        },
        {
            "id": "4",
            "name": "Mary Poppendieck",
            "number": "39-23-6423122"
        }
    ]

app.get('/info', (request, response) => {
    const personsCount = persons.length

    const time = new Date()

    response.send(
        `<p>Phonebook has info for ${personsCount} people</p>
        <p>${time}</p>`
    )
})


app.delete('/api/persons/:id', (request, response) => {
    console.log('Before delete:', persons)

    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    console.log('After delete:', persons)

    response.status(204).end()
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})


app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })

    } else if (persons.find(person => person.name === body.name)) {
        console.log("matching person found")
        return response.status(400).json({
            error: 'name must be unique'
        })

    }

    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 10000) + 1,
    }

    persons = persons.concat(person)

    response.json(person)
})


app.get('/api/persons', (request, response) => {
    response.json(persons)
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
const express = require('express')
const morgan = require('morgan')
const app = express()

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

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

// const morgan = (tokens, req, res, next) => {
//     console.log('method', tokens.method(req, res))
//     console.log('url', tokens.url(req, res))
//     console.log('status', tokens.status(req, res))
//     console.log('res', tokens.res(req, res, 'content-length'), '-')
//     console.log(tokens['response-time'](req, res), 'ms')
//     console.log('---')
// }

app.use(express.json())
app.use(morgan('tiny'))

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

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
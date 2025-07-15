require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


const app = express()


app.use(cors())
app.use(express.json())
app.use(express.static('dist'))


morgan.token('body', (req) => JSON.stringify(req.body))

app.use(morgan(`:method :url :status :res[content-length] - :response-time ms :body`))

app.get('/info', (request, response) => {
    const personsCount = persons.length

    const time = new Date()

    response.send(
        `<p>Phonebook has info for ${personsCount} people</p>
        <p>${time}</p>`


    )
})


app.delete('/api/persons/:id', (request, response, next) => {

    console.log("Heres the full request", request.params)
    Person.findByIdAndDelete(request.params.id)
        .then(deletedPerson => {
            if (deletedPerson) {
                console.log("Person deleted")
                response.status(204).end()
            } else {
                response.json(404).send({ error: "Person not found" })
            }
        })
        .catch(error => next(error))
})


app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
        .catch(error => next(error))
})


app.post('/api/persons', (request, response) => {

    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }

    const existingPeople = Person.find({ name: body.name })

    if (existingPeople.length > 0) {
        console.log("matching person found")
        return response.status(400).json({
            error: 'name must be unique'
        })

    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })

})


app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/', (req, res) => {
    res.send(`
    <h1>Welcome to the Phonebook API</h1>
    <p>Use <code>/api/persons</code> to view all contacts.</p>
    <p>Use <code>/info</code> for summary info.</p>
  `)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
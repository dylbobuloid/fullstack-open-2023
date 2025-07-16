const Name = ({person, removeNumber}) => {
    
    //console.log("person OBJ INSIDE NAME COMPONENT", person)
    return(

        <div className='numbers' key={person.id}>
        {person.name} {person.number}
        <button onClick={() => removeNumber(person.id)}>delete</button>
        </div>
    )
}

    export default Name
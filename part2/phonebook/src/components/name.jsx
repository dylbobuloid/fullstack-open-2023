const Name = ({person, removeNumber}) => {
    
    return(

        <div key={person.id}>
        {person.name} {person.number}
        <button onClick={() => removeNumber(person.id)}>delete</button>
        </div>
    )
}

    export default Name
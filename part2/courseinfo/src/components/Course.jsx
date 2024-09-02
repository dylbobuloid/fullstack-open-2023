const Course = ({course}) =>{
    console.log(course)
  
    const element = course.map(course =>
      <div key={course.id}>
        <Header course={course} />
        <Content courseContent={course} />
        <Total course={course} />
      </div>
    )
  
    console.log(element)
    return (
      
      <div>
        {element}
      </div>
    )
  }
  
  const Header = (props) =>{
    return(
      <div>
        <h1>{props.course.name}</h1>
      </div>
    )
  }
  
  const Part = (props) =>{
    return(
        <p>{props.part} {props.exercises}</p>
    )
  }
  
  const Content = (props) =>{
    console.log("Inside of content now" ,props)
  
    const element = props.courseContent.parts.map(parts =>
    <Part key={parts.id} part={parts.name} exercises={parts.exercises} />
    )
  
    return(
      <div>
        {element}
      </div>
    )
  
  }
  
  
  const Total = ({course}) =>{
  
  const total = course.parts.reduce((sum, parts) => sum + parts.exercises, 0)
  
    return(
      <div>
        <b>Total of {total} exercises</b>
      </div>
    )
  }

  export default Course
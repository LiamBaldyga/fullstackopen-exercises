const Course = ({ course }) => {
    return (
      <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
      </div>
    )
  }
  
  const Header = (props) => {
    return(
      <h1>
        {props.course}
      </h1>
    )
  }
  
  const Content = ({ parts }) => {
    return(
      <>
        {parts.map((part) => <Part part={part.name} exercise={part.exercises} key={part.id}/>)}
      </>
    )
  }
  
  const Part = ({part, exercise}) => {
    return(
      <p>
        {part} {exercise}
      </p>
    )
  }
  
  const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => {
      return sum += part.exercises
    }, 0)
    return(
      <b>
        total of exercises {total}
      </b>
    )
  }
  
  

export default Course
const Header = ({course})=> <h2>{course}</h2>

const Content = ({parts})=>{
  return(
    <div>
      {parts.map(part => 
        <p key = {part.id}> 
          {part.name} {part.exercises}
        </p>
      )}
    </div>
  )
}
  
const Total = ({parts})=>{
  const total = parts.reduce((initialValue, eachPart) => initialValue + eachPart.exercises, 0)
  return(
    <b>Number of exercises {total}</b>
  )
}

const Course = ({course})=>{
  return(
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts = {course.parts}/>
    </div>
  )
}

export default Course
const Header = ({course})=> <h1>{course}</h1>

const Content = ({parts})=>{
  return(
  <>
    <Part p = {parts[0].name} e = {parts[0].exercises}/>
    <Part p = {parts[1].name} e = {parts[1].exercises}/>
    <Part p = {parts[2].name} e = {parts[2].exercises}/>
  </>
  )
}

const Part = ({p,e})=> <p>{p} {e}</p>
  
const Total = ({parts})=>{
  return(
    <p>Number of exercises {parts[0].exercises + 
                            parts[1].exercises + 
                            parts[2].exercises}
    </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App
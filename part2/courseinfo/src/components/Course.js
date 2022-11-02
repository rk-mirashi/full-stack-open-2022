const Header = ({ heading }) => <h1>{heading}</h1>

const Total = ({ sum }) => <p><strong>Total of {sum.reduce((a,b)=> a + b.exercises , 0)} exercises </strong></p>

const Part = ({ part }) =>(
    <p>{part.name} {part.exercises}</p>
  )

const Content = ({ parts }) => (
  <div>
    
    {parts.map(part =>
          <Part key={part.id} part={part} />
        )}     
  </div>
)
const Course = ({ courses }) => (
  <>
    {courses.map(course => (     
    <div key={course.id}>
      <Header heading={course.name} />
      <Content parts={course.parts} />
      <Total sum={course.parts} />
    </div>))}
  </>
)

export default Course
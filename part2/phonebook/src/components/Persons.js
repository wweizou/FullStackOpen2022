const Persons = ({peopleToShow}) => {
  const Person = ({person})=> <div>{person.name} {person.number}</div>

    return (
        peopleToShow.map(person =>
            <Person key={person.name} person={person} />)
    )
}

export default Persons;
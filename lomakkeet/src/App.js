import React from 'react';
import Person from './components/Person'
import Otsikko from './components/Otsikko'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas',
          phoneNumber: '050-34567',
          id: 1
       }
      ],
      newName: '',
      newPhoneNumber: '',
      filter: ''
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    

    const personObject = {
      name: this.state.newName,
      phoneNumber: this.state.newPhoneNumber,
      id: this.state.persons.length + 1
    }  
    console.log('personObject ',personObject)


    const persons = this.state.persons.some(person => person.name  === personObject.name) ?
    this.state.persons : 
    this.state.persons.concat(personObject)


    this.setState({
      persons,
      newName: '',
      newPhoneNumber: ''
    })
  }

  handlePersonChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }

  handlePhoneChange = (event) => {
    console.log(event.target.value)
    this.setState({ newPhoneNumber: event.target.value })
  }

  handleFilter = (event) => {
    console.log(event.target.value)
    this.setState({ filter: event.target.value })
  }

  render() {

const personsList = 
this.state.filter.length === 0 ? this.state.persons:
this.state.persons.filter(p => p.name.toLowerCase().indexOf(this.state.filter.toLowerCase())!==-1)

    return (
      <div>
        <Otsikko otsikko='Puhelinluettelo'/>
        <div>
          rajaa näytettäviä <input onChange={this.handleFilter} /> 
          </div>

<Otsikko otsikko='Lisää nimi' />
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input 
            onChange={this.handlePersonChange}/>
          </div>
          <div>
            numero: <input 
            onChange={this.handlePhoneChange}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <Otsikko otsikko='Numerot' />
        <tbody>
       {personsList
         .map(person => <Person key={person.id} person={person} />)}
      </tbody>
      </div>
    )
  }
}

export default App


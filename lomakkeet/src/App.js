import React from 'react';
import Person from './components/Person'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas',
          id: 1
       }
      ],
      newName: ''
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    

    const personObject = {
      name: this.state.newName,
      id: this.state.persons.length + 1
    }  
    console.log('personObject ',personObject)


    const persons = this.state.persons.some(person => person.name  === personObject.name) ?
    this.state.persons : 
    this.state.persons.concat(personObject)


    this.setState({
      persons,
      newName: ''
    })
  }

  handlePersonChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input 
            onChange={this.handlePersonChange}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
       {this.state.persons.map(person => <Person key={person.id} person={person} />)}
      </div>
    )
  }
}

export default App


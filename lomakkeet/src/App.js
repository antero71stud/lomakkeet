import React from 'react';
import Person from './components/Person'
import Otsikko from './components/Otsikko'
import Notification from './components/Notification'
import personService from './services/Persons'
import './persons.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newPhoneNumber: '',
      filter: '',
      success: null,
      error: null
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    
    console.log('persons ',this.state.persons)

    const personObject = {
      name: this.state.newName,
      number: this.state.newPhoneNumber
    }  
    console.log('personObject ',personObject)
    
    const persons = this.state.persons.concat(personObject)

    const res = personService.create(personObject)
    //res.data

    //console.log('response ',res.data)

    this.setState({
      persons,
      newName: '',
      newPhoneNumber: ''
    })
    this.delayNotification(2000)
  }


  getPersons = () => {
    const persons = personService.getAll()
    console.log('persons',persons)
  }

  delayNotification = (timeout) => {
    setTimeout(() => {
      this.setState({success: null,
      error: null})
    }, timeout)
  }


  deletePerson = (event) => {
    console.log('delete painettu')
    console.log(event.target.id)
    personService.deletePerson(event.target.id)
    .then(response => {
      console.log(response.status)
      personService.getAll()
      .then(response => {
        this.setState({ persons: response.data,
                    success: 'henkilön poisto onnistui' })
      })
    })
    this.delayNotification(2000)
  }



  componentDidMount() {
    console.log('did mount')
    personService.getAll()
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ persons: response })
        console.log('response data ',response)
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
        <Notification message={this.state.success}/>
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
         .map(person => <Person key={person.id} person={person} command={this.deletePerson}/>)}
      </tbody>
      </div>
    )
  }
}

export default App


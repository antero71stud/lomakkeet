import React from 'react';
import Button from './Button' 


const Person = ({ person, command }) => {
  /*console.log('person ',person)*/
    return (
      <tr><td>{person.name}</td><td>{person.number}</td><td><Button person={person} label="poista" command={command}/></td></tr>
    )
  }

  export default Person
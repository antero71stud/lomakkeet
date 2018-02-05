import React from 'react';


const Button = ({ label, command,person }) => {
    console.log('label ',label)
    console.log('command ',command)
    return (
      <button id={person.id} onClick={command} type="submit">{label}</button>
    )
  }

  export default Button
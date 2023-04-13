import React, {useState} from 'react'

const CreateGame = () => {
    const [gameName, setGameName] = useState("") 
    const [rounds, setRounds] = useState(0)



  return (
    <div>
    <div>CreateGame</div>
    <form onSubmit={}>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>

    </div>
  )
}

export default CreateGame
import React, {useState} from 'react'










const Test = () => {
const [namey, setNamey] = useState('')
const [email, setEmail] = useState("")
const [list, setList] = useState([])


const handleAddName =(e) =>{
e.preventDefault()
    let person = {name: namey, email: email, complete: false }
  
     setList([...list, person])
     setNamey("")
     setEmail("")
}

const handleComplete =(person)=>{
const per = person
per.complete = true 
setList( [... list.filter((personn) => personn !== person), per])

//  per.complete = true 
// console.log("PERSOON AFTER: ", per)
// setList([...list, per])
}
const handleDelete =(person)=>{

  setList(  list.filter((personn) => personn !== person))
    }



return (
    <div>Test
<form>
<h1>Test Form</h1>
<label>NAMEY
<input type="text" value={namey} onChange={(e)=>setNamey(e.target.value)}/>
</label>
<label>email
<input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
</label>
<button type="submit" onClick={handleAddName}>ADD NAME</button>
</form>
<div>
    {list && list.length ?
    list.map((person)=>{
return(
    <h1 style={!person.complete ?{color: "red"}: {color: "blue"}}
     >{person.name}{person.name} <button onClick={()=>handleDelete(person)}>x</button><button onClick={()=>handleComplete(person)}>mark complete</button></h1>
)

    })
    :null}
</div>
    </div>
  )
}

export default Test
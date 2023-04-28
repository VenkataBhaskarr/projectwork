import React from 'react';
import "../static/teams.css"
import {useState , useEffect} from 'react'
import "../static/individuals.css"
import Button from '@mui/material/Button';
import {useNavigate} from "react-router"
import {account, databases} from "../appwrite/config.js"


function Teams(props) {

  const [checking , setChecking] = useState("bhaskar")


  const navigate = useNavigate();

  const [userDetails , setUserdetails] = useState()
  const [bro, setBro] = useState()


  const [checkin, setCheckin] = useState(true)

  useEffect(() => {
    
    const promise = account.get();
    promise.then((res) => {
      setUserdetails(res)
      // console.log(res)
    })

   
  
   const peeps = databases.listDocuments("642cce9608cce873a006" , "6448f65b838f55b36b1d").then((respi) => {
    // console.log(respi.documents)
    setPeople(respi.documents)
    
 })
  
  
  } , [checkin])









  
  const [people , setPeople ] =  useState([
    // { member1: 'John Doe', member2 : 'sdds', member3 : 'sdfsdf', member4 : 'dsfas', member5 : 'asdf', member6 : 'sdfa', email : 'john@doe' , faculty : "-" , project : '-' , requests : "1"} ,
    // { member1: 'John Doe', member2 : '-', member3 : 'sdfsdf', member4 : 'dsfas', member5 : 'asdf', member6 : 'sdfa', email : 'john@doe', faculty : "asf" , project : 'asedfds', requests : "1"},
    // { member1: 'John Doe', member2 : 'sdds', member3 : 'sdfsdf', member4 : 'dsfas', member5 : 'asdf', member6 : 'sdfa', email : 'john@doe', faculty : "asf" , project : 'asedfds', requests : "1"},
    // { member1: 'John Doe', member2 : 'sdds', member3 : 'sdfsdf', member4 : 'dsfas', member5 : 'asdf', member6 : 'sdfa', email : 'john@doe', faculty : "asf" , project : '-', requests : "1"},
    // { member1: 'John Doe', member2 : 'sdds', member3 : 'sdfsdf', member4 : 'dsfas', member5 : 'asdf', member6 : 'sdfa', email : 'john@doe', faculty : "asf" , project : 'asedfds', requests : "1"},
    // { member1: 'John Doe', member2 : 'sdds', member3 : 'sdfsdf', member4 : 'dsfas', member5 : 'asdf', member6 : 'sdfa', email : 'john@doe',faculty : "asf" , project : 'asedfds', requests : "1"},
    // { member1: 'John Doe', member2 : '-', member3 : '-', member4 : 'dsfas', member5 : 'asdf', member6 : 'sdfa', email : 'john@doe', faculty : "asf" , project : 'asedfds', requests : "1"},
  ]);

  const [teamlead, setTeamlead] = useState("");
  const [member2, setMember2] = useState("");
  const [member3, setMember3] = useState("");
  const [member4, setMember4] = useState("");
  const [member5, setMember5] = useState("");
  const [member6, setMember6] = useState("");
  const [email, setEmail] = useState("");
  const [faculty, setFaculty] = useState("");
  const [project, setProject] = useState("");
  const [sep , setSep] = useState(false);


  const submit = (e) => {
    //  e.preventDefault();
    console.log(userDetails.$id)
    if(sep !== true){
      console.log("as")
      setSep(true)
    }
    //  const newPerson =  { member1: 'John Doe', member2 : 'sdds', member3 : 'sdfsdf', member4 : 'dsfas', member5 : 'asdf', member6 : 'sdfa', email : 'john@doe', faculty : "asf" , project : 'asedfds' , requests : "1"};
    //  setCheckin(false)
    //  setPeople([...people, newPerson]);
  }

 

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = userDetails.$id
    console.log(id)
    const result = databases.createDocument("642cce9608cce873a006" , "6448f65b838f55b36b1d" , id , {
       member1 : teamlead,
       member2 : member2,
       member3 : member3,
       member4 : member4,
       member5 : member5,
       member6 : member6,
       email : email,
       project : project,
       faculty : faculty.replace,
    })

    setSep(false)

    result.then((res) => {
      setCheckin(false)
        console.log(res)
    })

}

  const remove = (e) => {
    const promise = databases.deleteDocument("642cce9608cce873a006" , "6448f65b838f55b36b1d" , userDetails.$id);
   
     promise.then((res) => {
      setPeople(people.slice(0,-1));
     })
     setCheckin(true)
  }

  return (
    <div className="table-container">
      <div className="table-row table-header">
        <div className="table-cell">TEAM LEAD</div>
        <div className="table-cell">MEMBER2</div>
        <div className="table-cell">MEMBER3</div>
        <div className="table-cell">MEMBER4</div>
        <div className="table-cell">MEMBER5</div>
        <div className="table-cell">MEMBER6</div>
        <div className="table-cell">EMAIL</div>
        <div className="table-cell">FACULTY</div>
        <div className="table-cell">PROJECT</div>

      </div>
      {people.map((person, index) => (
        <div className="table-row" key={index}>
          <div className="table-cell">{person.member1}</div>
          <div className="table-cell">{person.member2}</div>
          <div className="table-cell">{person.member3}</div>
          <div className="table-cell">{person.member4}</div>
          <div className="table-cell">{person.member5}</div>
          <div className="table-cell">{person.member6}</div>
          <div className="table-cell">{person.email}</div>
          <div className="table-cell">{person.faculty}</div>
          <div className="table-cell">{person.project}</div>
        </div>
      ))}

<br></br>
{checkin ? (
         <Button variant="contained" color="success" onClick={submit}>
               Join Your Team
         </Button>) : (<Button variant="contained" color="error" onClick={remove}>Remove Your Team permanently</Button>)
}
     <br></br>

     {sep ? (
       <div>
       <form onSubmit={handleSubmit}>
            <label htmlFor="teamlead">TeamLead : </label>
            <input type="text" id="name" name="name" value={teamlead} onChange={(e) => setTeamlead(e.target.value)} required />
            
            <label htmlFor="member2">member2:</label>
            <input type="text" id="email" name="email" value={member2} onChange={(e) => setMember2(e.target.value)} required />
            
            <label htmlFor="password">member3:</label>
            <input type="text" id="password" name="password" value={member3} onChange={(e) => setMember3(e.target.value)} required />
  
            <label htmlFor="regno">member4:</label>
            <input type="text" id="text" name="text" value={member4} onChange={(e) => setMember4(e.target.value)} required />
  
            <label htmlFor="regno">member5:</label>
            <input type="text" id="text" name="text" value={member5} onChange={(e) => setMember5(e.target.value)} required />
  
            <label htmlFor="regno">member6:</label>
            <input type="text" id="text" name="text" value={member6} onChange={(e) => setMember6(e.target.value)} required />
  
            <label htmlFor="regno">teamlead mail:</label>
            <input type="email" id="text" name="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
  
            <label htmlFor="regno">faculty:</label>
            <input type="text" id="text" name="text" value={faculty} onChange={(e) => setFaculty(e.target.value)} required />
  
            <label htmlFor="regno">project:</label>
            <input type="text" id="text" name="text" value={project} onChange={(e) => setProject(e.target.value)} required />
            
            
            <input type="submit" value="Submit" />
          </form>
       </div>
     ) : <div> </div>}

    </div>
  );
}

export default Teams;
import React from 'react';
import {useState , useEffect} from 'react'
import "../static/individuals.css"
import Button from '@mui/material/Button';
import {useNavigate} from "react-router"
import {account,databases} from "../appwrite/config.js"


function Individuals() {


  const navigate = useNavigate();

  const [userDetails , setuserDetails] = useState()

  const [people, setPeople] = useState([])


  useEffect(() => {
    const promise = account.get();
    promise.then(
        function(res){
        // console.log(res)
        setuserDetails(res)
        // console.log(userDetails)
         const details = databases.listDocuments("642cce9608cce873a006" , "642cd0e8e598fa603e2f").then((respi) => {
            setPeople(respi.documents)
         })
        
        //  setPeople(details)
       },
       function(error){
         console.log(error)
         navigate('/')
       }
   )
  
  } , [])

    // const [people , setPeople ] =  useState([
    //     { name: 'John Doe', age: 35, gender: 'Male' , email : 'john@doe' , requests : "1"},
    //     { name: 'Jane Doe', age: 28, gender: 'Female' , email : 'john@doe', requests : "1"},
    //     { name: 'Bob Smith', age: 42, gender: 'Male', email : 'john@doe' , requests : "1"},
    //     { name: 'Jane Doe', age: 28, gender: 'Female' , email : 'john@doe' , requests : "1"},
    //     { name: 'Bob Smith', age: 42, gender: 'Male', email : 'john@doe' , requests : "1"},
    //     { name: 'Jane Doe', age: 28, gender: 'Female' , email : 'john@doe', requests : "1"},
    //     { name: 'Bob Smith', age: 42, gender: 'Male', email : 'john@doe' , requests : "1"}
    //   ]);




   const [checkin, setCheckin] = useState(true)
      const submit = (e) => {
         e.preventDefault();
         
         const promise = databases.deleteDocument("642cce9608cce873a006" , "642cd0e8e598fa603e2f" , userDetails.$id);
        //  console.log(promise.$id);
         promise.then((res) => {
          setCheckin(false)
          setPeople(people.slice(0,-1));
          // const newPerson = { name: userDetails.name, age: res.RegNo, gender: res.Gender, email: userDetails.email , requests : res.count};
          // setCheckin(false)
          // setPeople([...people, newPerson]);
          // console.log(userDetails.$id)
         })
        
         
        //  const promise = databases.createDocument("642cce9608cce873a006" , "642cd0e8e598fa603e2f" , userDetails.$id,{
        //    RegNo : "20BCI7150",
        //    Gender : "male"
        //  })
        //  promise.then((res) => {
        //    console.log(res)
        //  })

      }
      const remove = (e) => {
        alert("user already removed")
     }

    
      return (
        <div className="table-container">
          <div className="table-row table-header">
            <div className="table-cell name">Name</div>
            <div className="table-cell">Reg.No</div>
            <div className="table-cell">EmailId</div>


          </div>
          {people.map((person, index) => (
            <div className="table-row" key={index}>
              <div className="table-cell">{person.Name}</div>
              <div className="table-cell">{person.age}</div>
              <div className="table-cell">{person.email}</div>

            </div>
          ))}

<br></br>

         {checkin ? (
         <Button variant="contained" color="warning" onClick={submit}>
               Remove your name permanently?
         </Button>) : (<Button variant="contained" color="error" onClick={remove}>Removed Successfully</Button>)
}
         
         <br></br>

         <div>
             
         </div>


        </div>
      );
}
export default Individuals;

import React, {useState , useEffect} from 'react';
import axios from 'axios';
import "../static/message.css"
import {useNavigate} from "react-router"
import {account} from "../appwrite/config.js"
import {databases} from "../appwrite/config.js"

const Sendmessage = () => {

  
  const navigate = useNavigate();

  const [userDetails , setuserDetails] = useState()

  useEffect(() => {const promise = account.get();
    promise.then(
        function(res){
         setuserDetails(res)
       },
       function(error){
         console.log(error)
         navigate('/')
       }
   )} , [])
  

  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [value , setValue] = useState(true);
  const [mail , setMail] = useState("");
  const [data , setData] = useState([]);

  const dontsubmit = (e) => {
      e.preventDefault();
      alert("please wait")
  }

  const handleSubmit = async (event) => {

    setMail(recipient);
    const searchMail = () => {
    const search = databases.listDocuments("642cce9608cce873a006" , "642cd0e8e598fa603e2f");
      search.then(function (response) {
      console.log(response.documents); 
        response.documents.map((d) => {
            if(d.Mail === mail){
               const sega = databases.getDocument('642cce9608cce873a006', '642cd0e8e598fa603e2f', d.$id);
               sega.then(function (response) {
                  const bored = databases.updateDocument('642cce9608cce873a006', '642cd0e8e598fa603e2f', d.$id , {count : response.count+1})
                  console.log(response.count)
               })
              
            }
        })

       
      }, function (error) {
        console.log(error); // Failure
      });
    
    }
    searchMail();
    // we need to verify the mail id with the databases's mail id if fetched correctly we should
    // access that user and update the value of the count value of the user accordingly
    setValue(false);
    setTimeout(() => {
      setValue(true);
    }, 5000)
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5001/api/send-email", {
        recipient,
        subject,
        content,
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="EmailForm">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="recipient">To:</label>
          <input
            type="email"
            id="recipient"
            value={recipient}
            onChange={(event) => setRecipient(event.target.value)}
            required
          />
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            required
          />
          <label htmlFor="content">Message:</label>
          <textarea
            id="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            required
          />

          {
            value ?  (
              <button type="submit">Send</button>
            ) : (<button type="submit" onClick={dontsubmit}>Wait for 30min</button>)
          }

        </form>
      </div>
    </div>
  );
};

export default Sendmessage;
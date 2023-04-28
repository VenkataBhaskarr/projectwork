import React , {useState , useEffect} from 'react';
import {account} from "../appwrite/config.js";
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';


const Credits = () => {
    const navigate = useNavigate()

    const [userDetails , setuserDetails] = useState();

    const logout = () => {
        const promise = account.deleteSession('current');

        promise.then(function (response) {
            console.log(response); // Success

            navigate("/")
        }, function (error) {
            console.log(error); // Failure
        });


    }


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

    return (


        <div>
            Please provide the feedback at anudeep@gmail.com
            <br></br>
            <br></br>
            <br></br>

            <Button variant="contained" color="error" onClick={logout}>Logout</Button>
        </div>

        
    );
};

export default Credits;
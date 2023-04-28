import React, { useState, useEffect } from "react";
import axios from "axios";
import "../static/assistance.css";
import { account } from "../appwrite/config.js";
import { useNavigate } from "react-router";
import { Configuration, OpenAIApi } from "openai";

const Assistant = () => {
  const navigate = useNavigate();

  const [userDetails, setuserDetails] = useState();

  useEffect(() => {
    // Define or import the 'account' variable
    const promise = account.get();
    promise.then(
      function (res) {
        setuserDetails(res);
      },
      function (error) {
        console.log(error);
        navigate("/");
      }
    );
  }, []);

  const [userQuery, setUserQuery] = useState("Explain about Arduino");
  const [response, setResponse] = useState("");

  const handleInputChange = (e) => {
    setUserQuery(e.target.value);
    console.log("input changing");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      getUserResponse(userQuery);
      console.log("function called");
    }
  };

  const configuration = new Configuration({
    apiKey: "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"
});
const openai = new OpenAIApi(configuration);

async function getUserResponse(prompt) {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 512,
    });
    console.log(completion.data.choices)
   setResponse(completion.data.choices[0].text);
}

  return (
    <div className="containerr">
      <h1 className="titlee">
        Your AI assistant to ask about your project ideas and help to some
        extent
      </h1>
      <div className="input-containerr">
        <label htmlFor="userQuery" className="labell">
          Write your query, and press enter
        </label>
        <br></br>
        <br></br>
        <input
          type="text"
          id="userQuery"
          name="userQuery"
          className="inputt"
          placeholder={userQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
      </div>

      {response && <p className="response">{response}</p>}
    </div>
  );
};

export default Assistant;

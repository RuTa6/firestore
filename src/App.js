import React, { useState, useEffect } from "react";
import { db } from "./firebase.js";
import "./App.css";

const App = () => {
  const [covid, setCovid] = useState(null);

  useEffect(async () => {
    db.collection("covid-patients")
      .where("countryName", "==", "India")
      .where("count", "<", 100)
      .onSnapshot((docs) => {
        console.log("covid patients count changed: ");
        const currentCovidData = [];
        docs.forEach((doc) => {
          console.log(doc.data());
          currentCovidData.push(doc.data());
        });
        setCovid(currentCovidData);
      });
  }, []);

  return (
    <div>
      <h1>Covid tracker</h1>
      {covid === null
        ? "Loading"
        : covid.map((country) => {
            return (
              <div>
                {country.countryName} Has {country.count} covid patients
              </div>
            );
          })}
    </div>
  );
};

export default App;

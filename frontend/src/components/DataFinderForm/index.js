import React, {useState, useRef} from 'react';
import axios from "axios";
import ResultsTable from '../ResultsTable';
import CircularProgress from '@mui/material/CircularProgress';

const api = axios.create({
    baseURL: "http://app.privaseame.com"
  });

export const DataFinderForm = () => {

    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [age, setAge] = useState('')
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState([])
    const [showResults, setShowResults] = useState(false)
    

    const handleFirstNameChange = (e) => {
        setFirstName(e.currentTarget.value)
    }

    const handleMiddleNameChange = (e) => {
        setMiddleName(e.currentTarget.value)
    }

    const handleLastNameChange = (e) => {
        setLastName(e.currentTarget.value)
    }

    const handleAgeChange = (e) => {
        setAge(e.currentTarget.value)
    }
    
    const handleCityChange = (e) => {
        setCity(e.currentTarget.value)
    }
    
    const handleStateChange = (e) => {
        setState(e.currentTarget.value)
    }
    
    const handleEmailChange = (e) => {
        setEmail(e.currentTarget.value)
    }
    
    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.currentTarget.value)
    }

    // if (!!window.EventSource) {
    //     var source = new EventSource('http://localhost:5000/find_data');
    //     source.onmessage = function(e) {
    //       console.log(e);
    //     }
    //   }

    // var socket = io.connect("http://localhost:5000/find_data")
    const sendData = async (e) => {
        e.preventDefault();
        setLoading(true);
        const response = await api({
            url: "/find_data",
            method: 'POST',
            responseType: 'stream',
            data: {person: {'first_name': firstName, 'middle_name': middleName, 'last_name': lastName, 'age': age, 'city': city, 'state': state, 'phone_number': phoneNumber, 'email': email}}
        });
        // const stream = response.data
        // stream.on('data', data => {
        //     console.log(data);
        // });
        
        // stream.on('end', () => {
        //     console.log("stream done");
        // });
        console.log(response)
        setLoading(false);
        setShowResults(true)
        setResults(response['data'])
        // socket.on('message', function(msg){
        //     results.append(msg);
        //   })
    }

    const resetPage = (e) => {
        e.preventDefault()
        setShowResults(false)
        setResults([])
    }

    return (
        <div className="container">
          {loading ? 
            <CircularProgress className='circular-progress' color='inherit' size='4rem'/>
            :
            <>
                {showResults ?
                    <div className='results-container'>
                            <ResultsTable results={results}/>
                            <div className='buttons-container'>
                                <button onClick={resetPage}>Perform another search</button>
                                <button>Download this report</button>
                                <button>Painfree Removal Services ($29.99)</button>
                            </div>
                    </div>
                    :
                    <div className='data-finder-container'>
                        <form onSubmit={sendData} id='data-form'>
                                <div className='wrapper'>
                                    <input required className='first-name' value={firstName} placeholder='First Name' onChange={handleFirstNameChange}></input>
                                    <input className='middle-name' value={middleName} placeholder='Middle Name' onChange={handleMiddleNameChange}></input>
                                    <input required className='last-name' value={lastName} placeholder='Last Name' onChange={handleLastNameChange}></input>
                                    <input required className='age' value={age} placeholder='Age' onChange={handleAgeChange}></input>
                                    <input required className='city' value={city} placeholder='City' onChange={handleCityChange}></input>
                                    <input required className='state' value={state} placeholder='State' onChange={handleStateChange}></input>
                                    <input className='phone-number' value={phoneNumber} placeholder='Phone Number' onChange={handlePhoneNumberChange}></input>
                                    <input className='email' value={email} placeholder='Email' onChange={handleEmailChange}></input>
                                </div>
                                <button className='run-button'>Run my report !</button>
                        </form>
                    </div>
                }
            </>
        }
        </div>
        
      )

}

export default DataFinderForm
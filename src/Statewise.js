import React, { useState, useEffect } from "react";
import './Statewise.css';
const Statewise = () => {
    const [info, setInfo] = useState([])

    const [check,setCheck]= useState('');
    const [searchApi,setSearchApi]= useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const getCovidData = async () => {
        try {
         
            const res = await fetch('https://api.publicapis.org/entries');
            const response = await res.json();
            
            if(Array.isArray(response.entries)){
                setInfo(response.entries);
                setCheck('');
                // console.log(response.statewise); 
            }else
            {
                console.error("Invalid api response", response);
            }   
        } catch (error) {
            console.error("Error fetching data : ",error);
        }
    }
    useEffect(() => {
        getCovidData();
    }, []);

    const filterData = info.filter((curEle)=>{
        if(check === '' && !searchApi)
        {
            return true;
        }
        else
        {
            return (
                (curEle.Cors === check)
                &&
                (searchApi==='' || curEle.API.toLowerCase().includes(searchApi.toLowerCase()))
                
                );
                
        }
    })
    const handleSearchSubmit = () => {
        if (filterData.length === 0) {
            setAlertMessage("API not found.");
        } else {
            setAlertMessage('');
        }
    }

    return (
        <div className="container-fluid">
            <div className="main-heading">
                <h1 className="mb-5 text-center"><span className="font-weight-bold"> INDIA</span> Animals Dashboard</h1>
            </div>
            <div>    
                <h4>Select the Cors :</h4>
            
                <select className="cors-selector" value={check} onChange={(e)=>{setCheck(e.target.value)}}>
                    <option value="">All</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="unknown">Unknown</option>
                </select>
            </div>
            
            <div>
                <input className="search-bar"
                        type="text"
                        placeholder="Search API by name"
                        value={searchApi}
                        onChange={(e)=>{setSearchApi(e.target.value)}}
                />
                <button className="search-button" onClick={handleSearchSubmit}>Submit</button>
            </div>   
            {alertMessage && <div className="alert alert-danger">{alertMessage}</div>}

            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr className="head-bod">
                            <th>API</th>
                            <td>Description</td>
                            <td>Auth</td>
                            <td>Cors</td>
                            <td>Link</td>
                            <td>Category</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filterData.map((curEle, ind) => {
                                return (
                                    <tr key={ind}>
                                        <td>{curEle.API}</td>
                                        <td>{curEle.Description}</td>
                                        <td>{curEle.Auth}</td>
                                        <td>{curEle.Cors}</td> 
                                        <td>{curEle.Link}</td>
                                        <td>{curEle.Category}</td> 
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Statewise;

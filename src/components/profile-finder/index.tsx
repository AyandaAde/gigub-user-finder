
import React, { useEffect, useState } from "react";
import "./styles.css"
import Suggestions from "./Suggestions";

const GithubProfileFrinder = () => {
    const [name, setName] = useState("Ayandaade");
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [searchParam, setSearchParam] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState();


    function handleChange(e) {
        const query = e.target.value.toLowerCase();
        setName(e.target.value);
        setSearchParam(query);
        if (query.length > 1) {
            const filteredData = users && users.length ?
                users.filter((item) => item.toLowerCase().indexOf(query) > -1) : [];
            //@ts-ignore
            setFilteredUsers(filteredData);
            setShowDropdown(true);
        }
    }
    async function handleSubmit() {
        const resp = await fetch(`https://api.github.com/users/${name}`);
        const respData = await resp.json();
        setData(respData);

    }

    async function fetchGithubUserDate() {
        const resp = await fetch(`https://api.github.com/users/${name}`);
        const respData = await resp.json();
        setData(respData);
    }

    async function fetchListOfUsers() {
        try {
            setLoading(true)
            const response = await fetch("https://dummyjson.com/users")
            const data = await response.json();

            if (data && data.users && data.users.length) {
                setUsers(data.users.map((user) => user.firstName));
                setLoading(false);
                setError(null);
            }
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchGithubUserDate();
        fetchListOfUsers();
    }, []);

    return (
        <div className="github-profile-container">
            <div className="input-wrapper">
                {
                    loading ? <h1>Loading...</h1>
                        :
                        <input
                            name="search-by-username"
                            type="text"
                            placeholder="Enter a github username"
                            value={searchParam}
                            onChange={handleChange}
                        />
                }
                {showDropdown && <Suggestions data={filteredUsers} />}
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>
            <div>
                <img
                    //@ts-ignore
                    src={data.avatar_url}
                />
                <h2>
                    {
                        //@ts-ignore
                        data.login
                    }
                </h2>

            </div>
        </div>
    )
}

export default GithubProfileFrinder
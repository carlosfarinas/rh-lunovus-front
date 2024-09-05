import {useEffect, useState} from "react";


export default function GithubUserFinder(props) {
    const [githubUser, setGithubUser] = useState('');
    const [userData, setUserData] = useState({});
    const [count, setCount] = useState(1);
    const [disableMoreButton, setDisableMoreButton] = useState(false);

    function handleSubmit() {
        setCount(1);
        setDisableMoreButton(false);
        getGithubData();
    }

    function handleCount() {
        setCount(count + 1);
        getGithubData();
    }

    async function getGithubData() {
        const res = await fetch("http://localhost:8000/api/gituser/" + githubUser + "/" + count);
        //const data = await res.json();
        //if (data && data.length > 0) {
        setUserData(await res.json());
        //setGithubUser('');
        //}
    }

    useEffect(() => {
        if (userData?.data?.followers.length === 0 || userData?.data?.followers.length < 30) {
            setDisableMoreButton(true);
        }
    }, [userData?.data?.followers.length]);

    useEffect(() => {
        getGithubData()
    }, []);
    console.log(userData);
    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Enter Github Username..."
                    value={githubUser}
                    onChange={(e) => setGithubUser(e.target.value)}
                />
                <button onClick={handleSubmit}>Search</button>
            </div>
            {
                userData !== '' ?
                    (
                        <div>
                            Name: {userData?.data?.user?.name}
                            <h3>Followers</h3>
                            {
                                userData?.data?.followers && userData?.data?.followers.length > 0
                                    ? userData.data.followers.map(follower => (
                                        <div className="follower" key={follower.id}>
                                            <img height="20px" width="20px" src={follower.avatar_url} alt={follower.login}/>
                                            <p className="follower_name">{follower.login}</p>
                                        </div>))
                                    : null
                            }
                            <div>
                                <button
                                    onClick={handleCount}
                                    disabled={disableMoreButton}>Load more
                                </button>
                                {
                                    disableMoreButton ? <p>You reach the total of followers</p> : null
                                }
                            </div>
                        </div>

                    ) : null
            }
        </div>
    )

}
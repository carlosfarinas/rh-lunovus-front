import { useState } from 'react'
import './App.css'
import GithubUserFinder from "./components/github-user-finder/index.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <GithubUserFinder/>
    </div>
  )
}

export default App

import { useEffect, useState } from "react";
import { ASSETS } from "./utils/assets";
import { BASE_URL } from "./utils/config";


export default function App() {
  const [apiResponse, setApiResponse] = useState(null)

  useEffect(() => {
    fetch(`${BASE_URL}/testapi`)
      .then(res => res.json())
      .then(res => setApiResponse(res))
      .catch(err => console.error('/testapi fails:', err))
  }, [])

  return (
    <div className="bg-b-base">
      <div className="bg-b-base">
        <header className="container">
          <h1>Header</h1>
        </header>
      </div>

      <main className="min-h-[100vh] container bg-darker">
        <h1>MAIN CONTENT</h1>
        <img src={ASSETS.profile.avatar} />
        {apiResponse
          ? (<h1>/testapi: {JSON.stringify(apiResponse)}</h1>)
          : (<h1>Loading API response...</h1>)
        }
      </main>

      <div className="bg-b-base">
        <footer className="container">
          <h1>Footer copyright</h1>
        </footer>
      </div>
    </div>
  );
}

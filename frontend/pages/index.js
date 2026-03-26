import { useState } from "react"

export default function Home() {

  const [sleep, setSleep] = useState("")
  const [activity, setActivity] = useState("")
  const [journal, setJournal] = useState("")
  const [result, setResult] = useState(null)

  const handleSubmit = async () => {

    const response = await fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sleep_hours: Number(sleep),
        activity_level: Number(activity),
        sentiment: journal.includes("stress") ? -1 : 1
      })
    })

    const data = await response.json()
    setResult(data.risk_score)
  }

  return (
    <div style={{padding:"40px", fontFamily:"Arial"}}>

      <h1>MindTrace AI</h1>
      <h3>Daily Mental Health Check</h3>

      <div style={{marginTop:"20px"}}>
        <label>Sleep Hours</label>
        <br/>
        <input
          type="number"
          value={sleep}
          onChange={(e)=>setSleep(e.target.value)}
        />
      </div>

      <div style={{marginTop:"20px"}}>
        <label>Activity Level (1-10)</label>
        <br/>
        <input
          type="number"
          value={activity}
          onChange={(e)=>setActivity(e.target.value)}
        />
      </div>

      <div style={{marginTop:"20px"}}>
        <label>Daily Journal</label>
        <br/>
        <textarea
          rows="4"
          cols="40"
          value={journal}
          onChange={(e)=>setJournal(e.target.value)}
        />
      </div>

      <button
        onClick={handleSubmit}
        style={{marginTop:"20px"}}
      >
        Analyze Mental Health
      </button>

      {result && (
        <div style={{marginTop:"30px"}}>
          <h2>Risk Score: {result}</h2>
        </div>
      )}

    </div>
  )
}
import { useState } from "react"

export default function Home() {

    const [sleep, setSleep] = useState("")
    const [activity, setActivity] = useState("")
    const [journal, setJournal] = useState("")
    const [result, setResult] = useState(null)

    const  handleSubmit = async () => {

        const response = await fetch("http://localhost:8000/predict", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
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
                onChange={(e) =>setSleep(e.target.value)}
              />  
            </div>
            
            <div style={{marginTop:"20px"}}>
                <label>Activity Level (1-10)</label>
                <br />
                <input 
                    type="number"
                    value={}
            </div>
        </div>
    )
}
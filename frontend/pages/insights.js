import { useState } from "react"

export default function Insights() {

  const [data, setData] = useState({
    sleep: 4,
    activity: 2,
    sentiment: -1
  })

  const calculateInsights = () => {

    let insights = []

    if (data.sleep < 5) {
      insights.push("⚠️ Sleep is critically low (less than 5 hours)")
    }

    if (data.activity < 3) {
      insights.push("⚠️ Physical activity is very low")
    }

    if (data.sentiment < 0) {
      insights.push("⚠️ Negative emotional patterns detected in journal")
    }

    return insights
  }

  const generateRecommendation = () => {

    let score = 0

    if (data.sleep < 5) score += 30
    if (data.activity < 3) score += 30
    if (data.sentiment < 0) score += 40

    if (score < 30) return "✅ You are doing well. Maintain your routine."

    if (score < 60) return "🧘 Try meditation and improve sleep habits."

    return "🚨 High stress detected. Consider talking to a professional."
  }

  return (
    <div style={{padding:"40px", fontFamily:"Arial"}}>

      <h1>Behavior Insights</h1>

      <h3>Current Metrics</h3>

      <p>Sleep: {data.sleep} hours</p>
      <p>Activity: {data.activity}/10</p>
      <p>Sentiment: {data.sentiment === -1 ? "Negative" : "Positive"}</p>

      <h3 style={{marginTop:"20px"}}>AI Insights</h3>

      {calculateInsights().map((item, index) => (
        <p key={index}>{item}</p>
      ))}

      <h3 style={{marginTop:"20px"}}>Recommendation</h3>

      <p>{generateRecommendation()}</p>

    </div>
  )
}
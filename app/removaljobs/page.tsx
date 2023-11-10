"use client"
import { useEffect, useState } from "react"

interface RemovalJobs {
  id: string
  location: string
  date: string
  debrisType: string
  containerStatus: string
  biofouling: string
  description: string
  island: string
  email: string
  phone: string
  captcha: string
}

export default function RemovalJobsPage() {
  const [jobs, setJobs] = useState<RemovalJobs[]>([])

  
  const getRemovalJobs = async () => {
    try {
      const response = await fetch("/api/report", {
        method: "GET",
      });
      const data = await response.json();
      setJobs(data);

      if (response.ok) {
        // Success - display success message, next steps, etc.
        console.log("SUCCESS");
      } else {
        // Handle errors, display an error message
      }
    } catch (error) {
      // Handle network/server errors
      console.log("ERROR", error);
    }
  }

  useEffect(() => {
    getRemovalJobs()  
  }, [])

  return (
    <>
    <h1>Removal Jobs Available</h1>
    {jobs.map((job, index) => {
      return (
      <>
      <div key={index} className="w-fit border-solid border-gray border-2 rounded-sm cursor-pointer">
        <h1 className="text-white">Job - {job.id}</h1>
        <p className="text-white">Location - {job.location}</p>
        <p className="text-white">Date - {job.date}</p>
        <p className="text-white">Debris Type - {job.debrisType}</p>
        <p className="text-white">Container Status - {job.containerStatus}</p>
        <p className="text-white">Biofouling - {job.biofouling}</p>
        <p className="text-white">Description - {job.description}</p>
        <p className="text-white">Island - {job.island}</p>
        <p className="text-white">Email - {job.email}</p>
        <p className="text-white">Phone - {job.phone}</p>
        <p className="text-white">Captcha - {job.captcha}</p>
      </div>
      </>
      )
    })}
    </>
  )
}
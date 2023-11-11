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
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [removalCompany, setRemovalCompany] = useState<string>("");

  
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

  const handleOnClick = () => {
    setModalOpen(true);
  }

  const handleRemovalJobClaimSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(removalCompany);
    setModalOpen(false);
    setRemovalCompany("");
  }

  useEffect(() => {
    getRemovalJobs()  
  }, [])

  const handleRemovalJobClaim = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRemovalCompany(e.target.value);
  }

  return (
    <>
    <h1 className="text-center mb-10">Removal Jobs Available</h1>
    <div className="flex justify-around">
      {jobs.map((job, index) => {
        return (
        <>
        <div onClick={handleOnClick} key={index} className="w-fit border-solid border-gray border-2 rounded-sm cursor-pointer bg-gray-50 flex flex-col w-250">
          <h1 className="text-black self-center font-bold">Job #{job.id}</h1>
          <h2 className="text-black font-bold">Debris Info</h2>
          <p className="text-black">Location - {job.location}</p>
          <p className="text-black">Date - {job.date}</p>
          <p className="text-black">Debris Type - {job.debrisType}</p>
          <p className="text-black">Container Status - {job.containerStatus}</p>
          <p className="text-black">Biofouling - {job.biofouling}</p>
          <p className="text-black">Description - {job.description}</p>
          <p className="text-black">Island - {job.island}</p>
          <h2 className="text-black font-bold">Contact Information</h2>
          <p className="text-black">Email - {job.email}</p>
          <p className="text-black">Phone - {job.phone}</p>
          {/* <p className="text-black">Captcha - {job.captcha}</p> */}
        </div>
        </>
        )
      })}
    </div>
    {modalOpen && (
      <form onSubmit={handleRemovalJobClaimSubmit}>
      <div className="bg-gray-50 flex flex-col fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-full w-1/3 h-1/3">
          <h1 className="text-black font-bold self-center justify-center">Claim Job</h1>
          <label className="text-black" htmlFor="name">Removal Company Name</label>
          <input className="text-black" type="text" placeholder="Name" value={removalCompany} onChange={handleRemovalJobClaim}/>
          <button className="text-black">Submit</button>
      </div>
    </form>
    )}
    </>
  )
}

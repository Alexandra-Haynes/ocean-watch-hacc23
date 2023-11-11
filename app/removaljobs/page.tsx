"use client"
import { useEffect, useRef, useState } from "react"

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
  status: string
}

interface FormData {
  id: string;
  status: string;
  removalCompany: string;
}

function useOutsideClick(ref: any, handleClickOutside: (event: any) => void) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default function RemovalJobsPage() {
  const [jobs, setJobs] = useState<RemovalJobs[]>([])
  const [jobSelected, setJobSelected] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [removalCompany, setRemovalCompany] = useState<string>("");

  const modalRef = useRef<HTMLFormElement>(null);

  function handleClickOutside(event: any) {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModalOpen(false)
    }
  }

  useOutsideClick(modalRef, handleClickOutside);

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

  const handleOnClick = (e: any) => {
    setJobSelected(e.target.parentElement.id);
    setModalOpen(true);
  }

  const handleRemovalJobClaimSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append("id", jobSelected.split("-")[1]);
    form.append("status", "claimed");
    form.append("removalCompany", removalCompany);

    setModalOpen(false);
    setRemovalCompany("");

    // Example: send formData to the server
    try {
      const response = await fetch("/api/report", {
        method: "PATCH",
        body: form,
      });
      if (response.ok) {
        // Success - display success message, next steps, etc.
        console.log("JOB CLAIMED SUCCESS");
      } else {
        // Handle errors, display an error message
      }
    } catch (error) {
      // Handle network/server errors
      console.log("ERROR", error);
    }
  }

  // TODO Fix this. Too many reloads
  useEffect(() => {
    getRemovalJobs()  
  }, [modalOpen])

  const handleRemovalJobClaim = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRemovalCompany(e.target.value);
  }

  return (
    <>
    <h1 className="text-center mb-10">Removal Jobs Available</h1>
    <div className="flex justify-around">
      {jobs.filter(j => j.status !== "claimed").map((job, index) => {
        return (
        <div id={`job-${job.id}`} onClick={(e) => handleOnClick(e)} key={index} className="w-fit border-solid border-gray border-2 rounded-sm cursor-pointer bg-gray-50 flex flex-col w-250">
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
        </div>
        )
      })}
    </div>
    {modalOpen && (
      <form onSubmit={handleRemovalJobClaimSubmit} ref={modalRef}>
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

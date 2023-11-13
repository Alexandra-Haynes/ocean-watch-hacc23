"use client";
import React, { useEffect, useRef, useState } from "react";
import JobCard from "../components/JobCard";
import ModalOverlay from "../components/ModalOverlay";
import ClaimedJobCard from "../components/ClaimedJobCard";
import RemovalJobModal from "../components/RemovalJobModal";

interface ClaimedJobs {
  id: string;
  address: string;
  latitude: string;
  longitude: string;
  date: string;
  debrisType: string;
  containerStatus: string;
  biofouling: string;
  description: string;
  island: string;
  email: string;
  phone: string;
  captcha: string;
  status: string;
}

interface FormData {
  id: string;
  status: string;
  removalCompany: string;
}

export default function ClaimedJobsPage() {
  const [jobs, setJobs] = useState<ClaimedJobs[]>([]);
  const [jobSelected, setJobSelected] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [removedJob, setRemovedJob] = useState<string>("");
  const [selectedIsland, setSelectedIsland] = useState<string>("");
  const [claimedTasks, setClaimedTasks] = useState<ClaimedJobs[]>([]); // Separate state for claimed tasks
  const [claimingCompany, setClaimingCompany] = useState<string>("");
  const [claimDate, setClaimDate] = useState<string>("");


  const getClaimedJobs = async () => {
    try {
      const response = await fetch("/api/report", {
        method: "GET",
      });
      const data = await response.json();
      setJobs(data);

      if (response.ok) {
        console.log("SUCCESS");
      } else {
        // Handle errors, display an error message
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const filterByIsland = (job: ClaimedJobs) => {
    return selectedIsland === "" || job.island === selectedIsland;
  };

  const handleOnClick = (e: any) => {
    const removalButtonClicked =
      e.target.tagName === "BUTTON" && e.target.innerText === "Removal Complete";

    if (removalButtonClicked) {
      setJobSelected(e.target.parentElement.id);
      setIsModalOpen(true);
    }
  };

  const handleRemovalJobClaimSubmit = async (formData: FormData) => {
    const form = new FormData();
    form.append("id", jobSelected.split("-")[1]);
    form.append("status", "removalcomplete");
    form.append("removalCompany", formData.removalCompany);

    setIsModalOpen(false);
    setRemovedJob("");

    try {
      const response = await fetch("/api/report", {
        method: "PATCH",
        body: form,
      });

      if (response.ok) {
        const claimedJobData = await response.json();
        const claimedCompany = formData.removalCompany;
        const claimDateTime = new Date().toLocaleString();

        const claimedJob: ClaimedJobs = {
          id: claimedJobData.id,
          address: claimedJobData.address,
          latitude: claimedJobData.latitude,
          longitude: claimedJobData.longitude,
          date: claimedJobData.date,
          debrisType: claimedJobData.debrisType,
          containerStatus: claimedJobData.containerStatus,
          biofouling: claimedJobData.biofouling,
          description: claimedJobData.description,
          island: claimedJobData.island,
          email: claimedJobData.email,
          phone: claimedJobData.phone,
          captcha: claimedJobData.captcha,
          status: claimedJobData.status,
        };

        setClaimedTasks((prevClaimedTasks) => [
          ...prevClaimedTasks,
          claimedJob,
        ]);
        setClaimingCompany(claimedCompany);
        setClaimDate(claimDateTime);

        console.log("JOB CLAIMED SUCCESS");
      } else {
        // Handle errors, display an error message
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    getClaimedJobs();
  }, [isModalOpen]);

  const removalCompleteJobs = jobs.filter(j => j.status === "removalcomplete")

  return (
    <>
      <section
        className="flex h-fit min-h-screen flex-col items-center 
      justify-center  px-4 pt-12 gap-4 custom-background pb-24"
      >
        <h1
          className="text-md md:text-2xl xl:text-4xl font-extrabold text-white text-center 
        lg:text-left pb-8"
        >
          Claimed Jobs Available
        </h1>
        <div className=" md:mr-12 mb-4 flex flex-row items-center justify-center gap-1">
          <label
            className="text-black px-4 flex flex-row items-center justify-center gap-1"
            htmlFor="island"
          >
            <img src="/assets/filter.png" alt="Filter" className="h-6 xl:h-8" />{" "}
          </label>
          <select
            value={selectedIsland}
            onChange={(e) => setSelectedIsland(e.target.value)}
            className="w-[160px] h-12 border-slate-300 border-2 rounded-md focus:rounded-none p-2"
          >
            <option value="">All Islands</option>
            <option value="Oahu">Oahu</option>
            <option value="Big Island">Big Island</option>
            <option value="Mauai">Mauai</option>
            <option value="Kauai">Kauai</option>
            <option value="Lanai">Lanai</option>
            <option value="Molokai">Molokai</option>
          </select>
        </div>
        <div className="grid xl:grid-cols-2 gap-8">
          {jobs
            .filter((j) => j.status === "claimed" && filterByIsland(j))
            .map((job, index) => (
              <JobCard
                key={index}
                job={job}
                onClick={handleOnClick}
                claimed={false}
                setJobSelected={setJobSelected}
                setIsModalOpen={setIsModalOpen}
                btnMessage="Removal Complete"
              />
            ))}
        </div>

        {jobs.filter(
          (j) => j.status === "claimed" && filterByIsland(j),
        ).length === 0 && (
          <div className="h-[400px] text-sm text-center text-white flex flex-col-reverse gap-8 items-center justify-center">
            No claimed jobs available for the selected island.
            <img src="/assets/map.png" alt="Hawaii map" className="h-24" />
          </div>
        )}
        {/* ______________claimed tasks________________ */}
        {removalCompleteJobs.length > 0 && (
          <>
            <div className="h-[1px] w-1/2 bg-white/20 my-4 mt-8"></div>
            <h2 className="text-md md:text-xl xl:text-2xl font-extrabold text-white text-center lg:text-left pb-8">
              Removal Complete and Pending Processing 
            </h2>

            <div className="grid grid-cols-2 gap-8">
              {claimedTasks.map((claimedJob, index) => (
                <ClaimedJobCard
                  key={index}
                  claimedJob={claimedJob}
                  onClick={handleOnClick}
                  claimingCompany={claimingCompany}
                  status={"Pending"}
                  lastUpdateDate={claimDate}
          
                
                />
              ))}
            </div>
          </>
        )}
      </section>
      <ModalOverlay
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />{" "}
      {isModalOpen && (
        <RemovalJobModal
          onSubmit={handleRemovalJobClaimSubmit}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

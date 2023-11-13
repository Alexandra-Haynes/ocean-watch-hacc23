"use client";
import React, { useEffect, useRef, useState } from "react";
import JobCard from "../components/JobCard";
import ModalOverlay from "../components/ModalOverlay";
import ClaimJobModal from "../components/ClaimJobModal";
import ClaimedJobCard from "../components/ClaimedJobCard";
import Navbar from "../components/Navbar";
import Image from "next/image";
interface RemovalJobs {
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

function useOutsideClick(ref: any, handleClickOutside: (event: any) => void) {
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default function RemovalJobsPage() {
  const [allReports, setAllReports] = useState<RemovalJobs[]>([]);
  const [jobs, setJobs] = useState<RemovalJobs[]>([]);
  const [allClaimedTasks, setAllClaimedTasks] = useState<RemovalJobs[]>([]);
  const [jobSelected, setJobSelected] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [removalCompany, setRemovalCompany] = useState<string>("");
  const [selectedIsland, setSelectedIsland] = useState<string>("");
  const [claimedTasks, setClaimedTasks] = useState<RemovalJobs[]>([]); // Separate state for claimed tasks
  const [claimingCompany, setClaimingCompany] = useState<string>("");
  const [claimDate, setClaimDate] = useState<string>("");

  const modalRef = useRef<HTMLFormElement>(null);

  function handleClickOutside(event: any) {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  }

  const getRemovalJobs = async () => {
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

  const filterByIsland = (job: RemovalJobs) => {
    return selectedIsland === "" || job.island === selectedIsland;
  };

  const handleOnClick = (e: any) => {
    const claimButtonClicked =
      e.target.tagName === "BUTTON" && e.target.innerText === "Claim task";

    if (claimButtonClicked) {
      setJobSelected(e.target.parentElement.id);
      setIsModalOpen(true);
    }
  };

  const handleRemovalJobClaimSubmit = async () => {
    setIsModalOpen(false)
  };

  useEffect(() => {
    getRemovalJobs();
  }, [isModalOpen]);

  const unclaimedJobs = jobs.filter((j) => j.status !== "claimed");
  const claimedJobs = jobs.filter((j) => j.status === "claimed");

  return (
    <>
      <section
        className="flex flex-col items-center 
      justify-center "
      >
        <Navbar />
        <h1
          className="text-md md:text-2xl xl:text-4xl font-extrabold text-white text-center 
        lg:text-left pb-8"
        >
          Removal Jobs Available
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
            <option value="Maui">Maui</option>
            <option value="Kauai">Kauai</option>
            <option value="Lanai">Lanai</option>
            <option value="Molokai">Molokai</option>
          </select>
        </div>
        <div className="grid xl:grid-cols-2 gap-8">
          {unclaimedJobs
            .filter((j) => j.status !== "claimed" && filterByIsland(j))
            .map((job, index) => (
              <JobCard
                key={index}
                job={job}
                onClick={handleOnClick}
                claimed={false}
                setJobSelected={setJobSelected}
                setIsModalOpen={setIsModalOpen}
                btnMessage="Claim Task"
              />
            ))}
        </div>

        {unclaimedJobs.filter(
          (j) => j.status !== "claimed" && filterByIsland(j),
        ).length === 0 && (
          <div className="h-[400px] text-sm text-center text-white flex flex-col-reverse gap-8 items-center justify-center">
            No reports available for the selected island.
            <img src="/assets/map.png" alt="Hawaii map" className="h-24" />
          </div>
        )}
        {/* ______________claimed tasks________________ */}
        {claimedJobs.length > 0 && (
          <>
            <div className="h-[1px] w-1/2 bg-white/20 my-4 mt-8"></div>
            <h2 className="text-md md:text-xl xl:text-2xl font-extrabold 
            text-white text-center lg:text-left pb-8">
              Claimed tasks
            </h2>

            <div className="grid grid-cols-2 gap-8">
              {claimedJobs.map((claimedJob, index) => (
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
        <ClaimJobModal
          onSubmit={handleRemovalJobClaimSubmit}
          onClose={() => setIsModalOpen(false)}
          job={jobSelected}
        />
      )}
    </>
  );
}

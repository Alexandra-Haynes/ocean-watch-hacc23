"use client";
import React, { useState, useEffect } from "react";
import { MdGpsFixed } from "react-icons/md";
import { RiMailSendLine } from "react-icons/ri";

interface FormData {
  address: string;
  latitude: string;
  longitude: string;
  fullAddress: string;
  date: string;
  debrisType: string;
  containerStatus: "Full";
  biofouling: number;
  debrisLocation: string;
  description: string;
  images: File[];
  island: string;
  email: string;
  phone: string;
  captcha: string;
}

function ReportForm() {
  const [formData, setFormData] = useState<FormData>({
    address: "",
    latitude: "",
    longitude: "",
    fullAddress: "",
    date: "",
    debrisType: "",
    containerStatus: "Full",
    biofouling: 1,
    debrisLocation: "",
    description: "",
    images: [],
    island: "",
    email: "",
    phone: "",
    captcha: "",
  });
  const [showCoordinates, setShowCoordinates] = useState(false);
  const [containerStatus, setContainerStatus] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const imageFiles = Array.from(files);

      setFormData({
        ...formData,
        images: imageFiles,
      });
    }
  };
  const handleContainerStatusChange = (status: string) => {
    setContainerStatus(status);
  };

  const handleBiofoulingChange = (value: number) => {
    setFormData({ ...formData, biofouling: value });
  };

  // Set the default date to be today's date
  useEffect(() => {
    const getCurrentDate = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0"); // Month is 0-based
      const day = String(now.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    setFormData({ ...formData, date: getCurrentDate() });
  }, []); // Empty dependency array ensures this runs only once

  // Get exact location
  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setFormData({
          ...formData,
          latitude: latitude.toString(),
          longitude: longitude.toString(),
        });
        setShowCoordinates(true);
        // Get the full address based on the coordinates using Positionstack API
        const apiKey = "";
        const query = `96706`;

        try {
          const response = await fetch(
            `/api/forward?access_key=${apiKey}&query=${query}`,
          );

          if (response.ok) {
            const data = await response.json();
            const address = data.data.results[0]?.label || "Address not found";
            setFormData({ ...formData, fullAddress: address });
          }
        } catch (error) {
          console.error(error);
          setFormData({ ...formData, fullAddress: "Address not found" });
        }
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    form.append("address", formData.address);
    form.append("latitude", formData.latitude);
    form.append("longitude", formData.longitude);
    form.append("date", formData.date);
    form.append("debrisType", formData.debrisType);
    form.append("containerStatus", formData.containerStatus);
    form.append("biofouling", String(formData.biofouling));
    form.append("description", formData.description);
    // Append each image file separately
    formData.images.forEach((image, index) => {
      form.append(`image${index}`, image);
    });

    form.append("island", formData.island);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append("captcha", formData.captcha);

    // Example: send formData to the server
    try {
      const response = await fetch("/api/report", {
        method: "POST",
        body: form,
      });
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
  };

  const debrisOptions = [
    "A mass of netting and/or fishing gear",
    "An abandoned or derelict boat",
    "A container/drum/cylinder",
    "A large concentration of plastics",
    "Potential Japan tsunami marine debris",
    "A large concentration of miscellaneous trash",
    "Other - describe below",
  ];
  const locationOptions = [
    "Caught on the reef or partially buried in sand",
    "Loose in the shore break or on the shoreline and could go back out to sea",
    "Trapped in a tide pool and cannot escape",
    "Loose on the shore but caught in the vegetation line",
    "Tied to a fixed object so it cannot be swept away",
    "Pushed inland above the high wash of the waves so it cannot be swept away",
    "Other - please explain in the description below",
  ];
  return (
    <section
      className="flex flex-col items-center justify-center gap-8 md:py-8 mt-4
    "
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start justify-center gap-2
        border-slate-500/30 border-2 rounded-md shadow-2xl p-6  md:p-8 bg-white/90"
      >
        <h2 className=" font-medium text-2xl self-center">
          Report Marine Debris
        </h2>
        <div className="h-[1px] w-full bg-slate-200 my-4 k"></div>

        <div className="flex flex-row items-start justify-between md:gap-12 ">
          <div className="mr-8">
            {/*________________________ Island Selection_______________ */}
            <div className="form-group flex flex-row items-center gap-4">
              <label htmlFor="island">Select Island</label>
              <select
                id="island"
                name="island"
                value={formData.island}
                onChange={handleChange}
                className="w-[200px] h-12 border-slate-300 border-2 rounded-md focus:rounded-none p-2"
              >
                <option value="" className="font-semibold">
                  Select an Island
                </option>
                <option value="Big Island" className="font-semibold">
                  Big Island
                </option>
                <option value="Oahu" className="font-semibold">
                  Oahu
                </option>
                <option value="Maui" className="font-semibold">
                  Maui
                </option>
                <option value="Kauai" className="font-semibold">
                  Kauai
                </option>
                <option value="Lanai" className="font-semibold">
                  Lanai
                </option>
                <option value="Molokai" className="font-semibold">
                  Molokai
                </option>
              </select>
            </div>
            {/* ____________________Location & address_________________ */}
            <div className="form-group">
              <label htmlFor="address">Location Coordinates:</label>

              {!showCoordinates && (
                <button
                  onClick={getUserLocation}
                  className="bg-green-400/50 rounded-md shadow-md p-2 px-4
            flex flex-row items-center justify-center gap-2 mb-2"
                >
                  <MdGpsFixed /> Get My Current Location
                </button>
              )}
              {showCoordinates && formData.latitude && formData.longitude && (
                <div className="form-group mb-2">
                  <p className="text-gray-600 ">
                    Latitude:{" "}
                    <span className="text-green-600 font-semibold">
                      {" "}
                      {formData.latitude}
                    </span>{" "}
                    | Longitude:{" "}
                    <span className="text-green-600 font-semibold">
                      {" "}
                      {formData.longitude}{" "}
                    </span>
                  </p>
                </div>
              )}

              <label htmlFor="address">Address:</label>
              <p className="text-gray-600 text-sm">
                Please provide specific details that help us pinpoint the debris
                location.
              </p>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            {/* ______________________DEBRIS TYPE_______________________ */}
            <div className="form-group">
              <label htmlFor="debrisType">Debris Type:</label>
              <select
                id="debrisType"
                name="debrisType"
                value={formData.debrisType}
                onChange={handleChange}
                className="w-full h-12 border-slate-300 border-2 rounded-md p-2
                "
              >
                <option value="">Select Debris Type</option>
                {debrisOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            {/* ______________________Container_______________________ */}
            <div>
              <label>
                <span className="font-semibold">
                  Did you find a container, a drum, or cylinder?
                </span>{" "}
                If yes, how full is it?
              </label>
              <div className="flex flex-row items-center start-center gap-4 pt-2">
                <label className="flex flex-row items-center gap-1 justify-center">
                  <input
                    type="radio"
                    name="containerStatus"
                    value="Full"
                    checked={containerStatus === "Full"}
                    onChange={() => handleContainerStatusChange("Full")}
                    className="h-6"
                  />
                  Full
                </label>
                <label className="flex flex-row items-center gap-1 justify-center">
                  <input
                    type="radio"
                    name="containerStatus"
                    value="Partially Filled"
                    checked={containerStatus === "Partially Filled"}
                    onChange={() =>
                      handleContainerStatusChange("Partially Filled")
                    }
                    className="h-6"
                  />
                  Partially Filled
                </label>
                <label className="flex flex-row items-center gap-1 justify-center">
                  <input
                    type="radio"
                    name="containerStatus"
                    value="Empty"
                    checked={containerStatus === "Empty"}
                    onChange={() => handleContainerStatusChange("Empty")}
                    className="h-6"
                  />
                  Empty
                </label>
              </div>
            </div>

            {/* ______________________Debris Location Details_______________________ */}
            <div className="form-group pt-4">
              <label htmlFor="debrisLocation">
                The debris is best described as:
              </label>
              <select
                id="debrisLocation"
                name="debrisLocation"
                value={formData.debrisLocation}
                onChange={handleChange}
                className="w-full h-12 border-slate-300 border-2 p-2 rounded-md"
              >
                <option value="" className="h-2 pt-2 ">
                  Select Debris Location Details
                </option>
                {locationOptions.map((option, index) => (
                  <option key={index} value={option} className="h-2 pt-2">
                    {option}
                  </option>
                ))}
              </select>
            </div>
            {/* ______________________Biofouling_______________________ */}
            <div className="pt-2">
              <div className="flex flex-row items-center justify-start gap-4">
                <label className="font-semibold pt-2">
                  Algae and marine life:
                </label>
                <input
                  type="range"
                  name="biofouling"
                  min={1}
                  max={10}
                  value={formData.biofouling}
                  onChange={(e) =>
                    handleBiofoulingChange(Number(e.target.value))
                  }
                  className="w-1/3"
                />
                <p className="text-gray-600 text-sm">{formData.biofouling}</p>
              </div>
              <p className="text-gray-600 text-sm py-2 w-full">
                On a scale of one to ten, how much biofouling is on the item you
                found? <br />
                1 - no marine growth <br />
                10 - significant marine life covering all submerged surfaces
              </p>
            </div>
          </div>

          <div className="flex flex-row items-start justify-center">
            <div className="h-[420px] w-[1px] bg-orange-400/20 mr-6 md:mr-12 self-center "></div>
            <div>
              {/*__________________ Email_____________________________ */}
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-12 border-slate-300 border-2 rounded-md p-2"
                />
              </div>

              {/*___________________ Phone Number_____________________ */}
              <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full h-12 border-slate-300 border-2 rounded-md p-2"
                />
                <p className="text-gray-600 text-sm py-2 w-full">
                  Please include area code
                </p>
              </div>
              {/* __________________________IMAGE_____________________ */}
              <div className="form-group max-w-[340px]">
                <label htmlFor="image">Upload Images (up to 6):</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  multiple // Allow multiple file selection
                  className="w-[300px]"
                />
                <p className="text-gray-600 text-sm py-2 w-full">
                  A photo can provide crucial information about the debris,
                  helping us better understand its nature and assisting in the
                  removal process.
                  <br />
                  Maximum 30 MB per image.
                </p>
                {formData.images.length > 0 && (
                  <div className="flex flex-row  items-center justify-start gap-2 ">
                    {formData.images.map((image, index) => (
                      <div
                        key={index}
                        className="flex flex-row items-end gap-4"
                      >
                        <img
                          src={URL.createObjectURL(image)}
                          alt="Image Preview"
                          style={{ maxHeight: "50px" }}
                          className="h-auto"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* _______________________________DESCRIPTION__________________ */}
        <div className="form-group w-full ">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full lg:max-w-[700px] h-[100px] p-2 bg-white rounded-sm "
          />
          <div className="text-gray-600 text-sm max-w-[1000px]">
            Providing a detailed description is essential in assessing and
            addressing marine debris effectively. <br />
            Please include information such as: The more details you provide,
            the better we can respond to the report.
          </div>
        </div>
        {/* ________________________________DATE______________________ */}

        <div className="form-group flex flex-row items-center gap-4">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        {/*____________________ Captcha Verification ___________________*/}
        {/* <div className="form-group">
          <label htmlFor="captcha">Captcha Verification:</label>
          {/* here we add the reCAPTCHA api stuff from https://www.google.com/recaptcha
          and we use  npm install react-google-recaptcha library */}
        {/* </div> */}
        <button
          className="bg-green-700 text-white px-5 py-2 rounded-full ml-1
        shadow-lg hover:bg-green-600 transition-all duration-200 ease-in-out scale-110
        hover:translate-y-1 flex flex-row items-center justify-center gap-2 w-[140px]"
          style={{
            background:
              "linear-gradient(220deg, rgba(156,252,142,1) 0%, rgba(46,152,70,1) 28%, rgba(2,10,20,1) 100%)",
          }}
          type="submit"
        >
          Submit
          <RiMailSendLine className="text-white text-xl" />
        </button>
        <div className="h-[1px] w-full bg-slate-200 my-4"></div>
        <p className="text-gray-600 text-sm py-2 w-full max-w-[800px]">
          Information you submit through this form is shared between divisions
          within DLNR, researchers at the University of Hawaii, NOAA,
          Non-Government Organizations and other agencies that manage marine
          debris and Aquatic Invasive Species. Your contact information is kept
          confidential.
        </p>
      </form>
    </section>
  );
}

export default ReportForm;

'use client'
import React, { useState, useEffect } from "react";
import { MdGpsFixed } from "react-icons/md";

interface FormData {
  location: string;
  latitude: string;
  longitude: string;
  fullAddress: string;
  date: string;
  debrisType: string;
  description: string;
  image: File | null;
}

function ReportForm() {
  const [formData, setFormData] = useState<FormData>({
    location: "",
    latitude: "",
    longitude: "",
    fullAddress: "",
    date: "",
    debrisType: "",
    description: "",
    image: null, // store the  image
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData({ ...formData, image: file ?? null });

    // Preview of image
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imagePreview = document.getElementById(
                "image-preview"
            ) as HTMLImageElement;
            if (imagePreview && e.target) {
                imagePreview.src = e.target.result as string;
            }
        };
        reader.readAsDataURL(file);
    }
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

        // Get the full address based on the coordinates using Positionstack API
        const apiKey = "";
        const query = `96706`;

        try {
          const response = await fetch(
            `/api/forward?access_key=${apiKey}&query=${query}`
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
    form.append("location", formData.location);
    form.append("date", formData.date);
    form.append("debrisType", formData.debrisType);
    form.append("description", formData.description);
    if (formData.image) {
      form.append("image", formData.image);
    }

    // Example: send formData to the server
    // try {
    //   const response = await fetch("/api/report", {
    //     method: "POST",
    //     body: form,
    //   });
    //   if (response.ok) {
    //     // Success - display success message, next steps, etc.
    //   } else {
    //     // Handle errors, display an error message
    //   }
    // } catch (error) {
    //   // Handle network/server errors
    // }
  };
  return (
    <section
      className="flex flex-col items-center justify-center gap-8 py-12
    "
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start justify-center gap-2
        border-slate-500/30 border-2 rounded-md shadow-2xl p-12 bg-white/90"
      >
        <h2 className=" font-medium text-xl self-center">
          Report Marine Debris
        </h2>
        <div className="h-[1px] w-full bg-slate-200 my-4"></div>
        {/* _______________DATE______________________ */}
        <div className="form-group flex flex-row gap-4">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        {/* ________________DEBRIS TYPE____________________ */}
        <div className="form-group flex flex-row gap-4 whitespace-nowrap">
          <label htmlFor="debrisType">Debris Type:</label>
          <select
            id="debrisType"
            name="debrisType"
            value={formData.debrisType}
            onChange={handleChange}
            className="w-full p-2 bg-white rounded-sm"
          >
            <option value="">Select Debris Type</option>
            <option value="Plastic Bottles">Plastic Bottles</option>
            <option value="Plastic Bags">Plastic Bags</option>
            <option value="Fishing Nets">Fishing Nets</option>
            <option value="Fishing Lines">Fishing Lines</option>
            <option value="Plastic Containers">Plastic Containers</option>
            <option value="Styrofoam">Styrofoam</option>
            <option value="Plastic Straws">Plastic Straws</option>
            <option value="Cigarette Butts">Cigarette Butts</option>
            <option value="Glass Bottles">Glass Bottles</option>
            <option value="Aluminum Cans">Aluminum Cans</option>
            <option value="Food Packaging">Food Packaging</option>
            <option value="Plastic Utensils">Plastic Utensils</option>
            <option value="Beverage Cans">Beverage Cans</option>
            <option value="Paper Bags">Paper Bags</option>
            <option value="Tires">Tires</option>
            <option value="Clothing and Fabric">Clothing and Fabric</option>
            <option value="Shoes">Shoes</option>
            <option value="Lumber and Wood">Lumber and Wood</option>
            <option value="Metal Scraps">Metal Scraps</option>
            <option value="Appliances">Appliances</option>
            <option value="Oil Drums">Oil Drums</option>
            <option value="Electronic Waste (e-waste)">
              Electronic Waste (e-waste)
            </option>
            <option value="Medical Waste">Medical Waste</option>
            <option value="Household Items">Household Items</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {/* _____________LOCATION_________________ */}
        <div className="form-group">
          <label htmlFor="location">
            Location Coordinates (Latitude, Longitude):
          </label>
          <button
            onClick={getUserLocation}
            className="bg-green-300 rounded-sm shadow-md p-2
            flex flex-row items-center justify-center gap-2 mb-2"
          >
            <MdGpsFixed /> Get My Current Location
          </button>

          {formData.latitude && formData.longitude && (
            <div className="form-group">
              <p>Latitude: {formData.latitude}</p>
              <p>Longitude: {formData.longitude}</p>
              <p>
                Full Address: ...get API to display it... {formData.fullAddress}
              </p>
            </div>
          )}
          <p className="p-2 flex flex-row items-center justify-start gap-1 opacity-60">
            ________________<span className="pt-2">OR</span>_________________
          </p>

          <label htmlFor="location">Type exact address:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        {/* _________________IMAGE_____________________ */}
        <div className="form-group">
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="lg:max-w-[700px]"
          />
          <p className="text-gray-600 text-sm py-2">
            A photo can provide crucial information about the debris, helping us
            better understand its nature and assisting in the removal process.
          </p>
          {formData.image && (
            <div className="flex flex-row items-end gap-4">
              {" "}
              <img
                id="image-preview"
                src=""
                alt="Image Preview"
                style={{ maxWidth: "120px" }}
                className="rounded-md shadow-lg h-auto"
              />
              <p className="text-green-500 text-[.8rem] font-semibold">
                Thank you!
              </p>
            </div>
          )}
        </div>

        {/* ___________________DESCRIPTION__________________ */}
        <div className="form-group w-full">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full lg:max-w-[700px] h-[200px] p-2 bg-white rounded-sm "
          />
          <div className="text-gray-600 text-sm">
            Providing a detailed description is essential in assessing and
            addressing marine debris effectively. Please include information
            such as:
            <ul className="list-disc ml-6">
              <li>
                Additional location details that would assist us in locating the
                debris more accurately
              </li>
              <li>
                Indicate the accessibility of the location. Is it easily
                reachable by land or only accessible by boat or on foot?
              </li>
              <li>Is it tangled or embedded in any way?</li>
              <li>Any visible markings or labels?</li>
              <li>
                If there are any marine animals or birds interacting with the
                debris, describe their condition and behavior.
              </li>
            </ul>
            The more details you provide, the better we can respond to the
            report.
          </div>
        </div>

        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md
        shadow-lg hover:bg-green-700 transition-all duration-200 ease-in-out"
          type="submit"
        >
          Submit Report
        </button>
      </form>
    </section>
  );
}

export default ReportForm;

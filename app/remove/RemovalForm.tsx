"use client";
import { useState } from "react";

// TODO: Change this
interface RemovalFormData {
  detectionDate: string;
  detectionLocation: string;
  environmentalDamage: string;
  debrisType: string;
  debrisApproxSize: string;
}

export default function RemovalForm() {
  const [formData, setFormData] = useState<RemovalFormData>({
    detectionDate: "",
    detectionLocation: "",
    environmentalDamage: "",
    debrisType: "",
    debrisApproxSize: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    form.append("detectionDate", formData.detectionDate);
    form.append("detectionLocation", formData.detectionLocation);
    form.append("environmentalDamage", formData.environmentalDamage);
    form.append("debrisType", formData.debrisType);
    form.append("debrisApproxSize", formData.debrisApproxSize);

    // Example: send formData to the server
    try {
      const response = await fetch("/api/remove", {
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h2>Removal Form</h2>
        <div>
          <label htmlFor="environmentalDamage">Environmental Damage:</label>
          <textarea
            id="environmentalDamage"
            name="environmentalDamage"
            value={formData.environmentalDamage}
            onChange={handleChange}
            className="w-full lg:max-w-[700px] h-[200px] p-2 bg-white rounded-sm text-black "
          />
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

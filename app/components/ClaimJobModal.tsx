
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";


interface FormData {
  id: string;
  status: string;
  removalCompany: string;
}
interface ModalProps {
  onSubmit: (formData: FormData) => void;
}

interface ClaimFormData {
  id: string;
  status: string;
  removalCompany: string;
}

interface ClaimJobModalProps {
  onSubmit: (formData: FormData) => void;
  onClose: () => void;
}

function ClaimJobModal({ onSubmit, onClose }: ClaimJobModalProps) {
  const [removalCompany, setRemovalCompany] = useState("");

 const handleSubmit = (e: React.FormEvent) => {
   e.preventDefault();
   const formData: FormData = {
     id: "", 
     status: "",
     removalCompany,
   };
   onSubmit(formData);
   setRemovalCompany("");
 };

  return (
    <div
      className="bg-gray-50 flex flex-col fixed top-1/2 left-1/2 transform rounded-md
    -translate-x-1/2 -translate-y-1/2 max-w-full w-1/3 h-fit z-50 shadow-2xl p-6 "
    >
      <button className="absolute top-2 right-2 text-black" onClick={onClose}>
        {" "}
        <FaTimes className="text-pink-700 text-sm hover:scale-110" />
      </button>
      <h1 className="text-black font-bold self-center justify-center">
        Claim Job
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start justify-center gap-4 mt-4"
      >
        <label className="text-black" htmlFor="name">
          Who is claiming this task?
        </label>
        <input
          className="text-black p-1 text-sm"
          type="text"
          placeholder="Removal Company Name"
          value={removalCompany}
          onChange={(e) => setRemovalCompany(e.target.value)}
        />
        <button
          type="submit"
          className="text-black  self-end  text-sm  bg-yellow-500 rounded-full
        shadow-md px-3 py-1 mt-4"
        >
          Submit
        </button>
        <div className="h-[.5px] w-full bg-yellow-700/40"> </div>
        <p className="text-slate-700 text-[.7rem]">
          When assigning this task to the specified removal company mentioned
          above, an automatic notification will be sent out across the network,
          including the WhatsApp group chat.
        </p>
      </form>
    </div>
  );
}

export default ClaimJobModal;

"use client";

import { ExamSessionListDto } from "@/types/exam";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaPen, FaCheck } from "react-icons/fa";

interface SessionItemProps {
  session: ExamSessionListDto;
  onSave: (id: string, updatedSession: ExamSessionListDto) => void; 
}

const SessionItem = ({ session, onSave }: SessionItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedSession, setUpdatedSession] = useState<ExamSessionListDto>(session);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    
    const localDate = new Date(updatedSession.sessionDate); 
    const currentLocalTime = new Date(); 
    const timeString = currentLocalTime.toISOString().slice(11, 19);
    updatedSession.sessionDate = `${localDate.toISOString().slice(0, 10)}T${timeString}Z`; 

    onSave(session.id, updatedSession); 
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedSession((prevSession) => ({
      ...prevSession,
      [name]: value,
    }));
  };

  return (
    <motion.div
      className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl cursor-grab transition-all duration-300"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex justify-between items-center">
        <div>
          {isEditing ? (
            <>
              <input
                type="text"
                name="subject"
                value={updatedSession.subject}
                onChange={handleChange}
                className="font-semibold text-xl text-gray-800 border-b-2 border-gray-300 focus:outline-none"
              />
              <input
                type="date" 
                name="sessionDate"
                value={updatedSession.sessionDate.slice(0, 10)}  
                onChange={handleChange}
                className="mt-2 text-sm text-gray-500 border-b-2 border-gray-300 focus:outline-none"
              />
            </>
          ) : (
            <>
              <p className="font-semibold text-xl text-gray-800">{session.subject}</p>
              <p className="text-sm text-gray-500">{new Date(session.sessionDate).toLocaleDateString('en-GB', { timeZone: 'UTC' })}</p>
            </>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <FaCheck
              onClick={handleSaveClick}
              className="text-green-500 cursor-pointer"
            />
          ) : (
            <FaPen
              onClick={handleEditClick}
              className="text-gray-500 cursor-pointer"
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SessionItem;

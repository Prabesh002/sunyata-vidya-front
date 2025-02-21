"use client";

import { ExamSessionListDto } from "@/types/exam";
import { motion } from "framer-motion";

interface SessionItemProps {
  session: ExamSessionListDto;
}

const SessionItem = ({ session }: SessionItemProps) => {
  return (
    <motion.div
      className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl cursor-grab transition-all duration-300"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold text-xl text-gray-800">{session.subject}</p>
          <p className="text-sm text-gray-500">{new Date(session.sessionDate).toLocaleString()}</p>
        </div>
        <div className="flex items-center">
          <p className="text-sm text-gray-500 mr-2">Order:</p>
          <div className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">
            {session.sequenceOrder}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SessionItem;

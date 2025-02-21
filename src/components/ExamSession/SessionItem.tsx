"use client";

import { ExamSessionListDto } from "@/types/exam";
import { motion } from "framer-motion";

interface SessionItemProps {
  session: ExamSessionListDto;
}

const SessionItem = ({ session }: SessionItemProps) => {
  return (
    <motion.div
      className="bg-gray-100 p-3 rounded-lg shadow-sm cursor-grab"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold text-lg">{session.subject}</p>
          <p className="text-sm text-gray-600">{session.sessionDate}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Order: {session.sequenceOrder}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default SessionItem;
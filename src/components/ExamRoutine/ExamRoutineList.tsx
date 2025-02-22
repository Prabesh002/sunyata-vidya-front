"use client";

import { ExamRoutineListDto } from "@/types/exam";
import Link from "next/link";

interface ExamRoutineListProps {
  routines: ExamRoutineListDto[];
  examId: string;
}

const ExamRoutineList = ({ routines, examId }: ExamRoutineListProps) => {
  return (
    <div className="space-y-4 mt-8">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {routines.map((routine) => (
          <li
            key={routine.id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Link
              href={`/exams/${examId}/routines/${routine.id}`}
              className="block text-lg font-semibold text-gray-800 hover:text-blue-600"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-500">
                  Class: {routine.class.className} - {routine.class.section}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExamRoutineList;

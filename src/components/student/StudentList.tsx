"use client";

import { StudentListDto } from "@/types/student";
import Link from "next/link";
import { FaUserGraduate } from "react-icons/fa";

interface StudentListProps {
  students: StudentListDto[];
}

const StudentList = ({ students }: StudentListProps) => {
  return (
    <ul>
      {students.map((student) => (
        <li key={student.id} className="py-2">
          <Link href={`/student/${student.id}`} className="flex items-center gap-2 hover:text-blue-500">
            <FaUserGraduate className="text-gray-500" />
            {student.name} (Section: {student.currentSection})
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default StudentList;
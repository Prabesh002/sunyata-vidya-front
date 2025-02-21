"use client";

import { ExamRoutineListDto } from "@/types/exam";
import Link from "next/link";

interface ExamRoutineListProps {
  routines: ExamRoutineListDto[];
  examId: string;
}

const ExamRoutineList = ({ routines, examId }: ExamRoutineListProps) => {
  return (
    <ul>
      {routines.map((routine) => (
        <li key={routine.id}>
          <Link href={`/exams/${examId}/routines/${routine.id}`}>
            {routine.class.className} - {routine.class.section}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ExamRoutineList;
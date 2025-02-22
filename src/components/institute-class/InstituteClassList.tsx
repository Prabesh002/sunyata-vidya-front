"use client";

import { InstituteClassListDto } from "@/types/institute-class";
import Link from "next/link";
import { FaEye } from "react-icons/fa"; 

interface InstituteClassListProps {
  classes: InstituteClassListDto[];
}

const InstituteClassList = ({ classes }: InstituteClassListProps) => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <ul className="space-y-4">
        {classes.map((instituteClass) => (
          <li
            key={instituteClass.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2">
              <Link
                href={`/institute-class/${instituteClass.id}`}
                className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors"
              >
                {instituteClass.className}
              </Link>
              <Link href={`/institute-class/${instituteClass.id}`}>
                <FaEye className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer" />
              </Link>
            </div>
            <span className="text-sm text-gray-500">
              (Sections: {instituteClass.sections.join(", ")})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstituteClassList;

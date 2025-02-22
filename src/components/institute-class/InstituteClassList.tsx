"use client";

import { InstituteClassListDto } from "@/types/institute-class";
import Link from "next/link";

interface InstituteClassListProps {
  classes: InstituteClassListDto[];
}

const InstituteClassList = ({ classes }: InstituteClassListProps) => {
  return (
    <ul>
      {classes.map((instituteClass) => (
        <li key={instituteClass.id}>
          <Link href={`/institute-class/${instituteClass.id}`}>
            {instituteClass.className} (Sections: {instituteClass.sections.join(", ")})
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default InstituteClassList;
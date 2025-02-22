"use client";

import { InstituteClassListDto } from "@/types/institute-class";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FaChalkboardTeacher, FaLayerGroup } from "react-icons/fa";

interface InstituteClassDetailsProps {
  instituteClass: InstituteClassListDto;
}

const InstituteClassDetails = ({ instituteClass }: InstituteClassDetailsProps) => {
  return (
    <Card className="max-w-lg mx-auto mt-10 p-6 shadow-lg border border-gray-200 rounded-lg">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <FaChalkboardTeacher className="text-blue-500" /> {instituteClass.className}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-gray-600">
          <FaLayerGroup className="text-green-500" />
          <span className="text-sm">Sections: {instituteClass.sections.join(", ")}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstituteClassDetails;

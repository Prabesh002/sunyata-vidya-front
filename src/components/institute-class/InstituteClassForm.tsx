"use client";

import { InstituteClassCreateDto, InstituteClassUpdateDto } from "@/types/institute-class";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { FaChalkboardTeacher, FaPlus, FaEdit } from "react-icons/fa";

interface InstituteClassFormProps {
  onSubmit: (data: InstituteClassCreateDto | InstituteClassUpdateDto) => Promise<void>;
  initialValues?: InstituteClassCreateDto | InstituteClassUpdateDto;
  isEditMode?: boolean;
}

const InstituteClassForm = ({ onSubmit, initialValues, isEditMode }: InstituteClassFormProps) => {
  const [className, setClassName] = useState(initialValues?.className || "");
  const [sections, setSections] = useState(initialValues?.sections?.join(", ") || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sectionsArray = sections.split(",").map((section) => section.trim());
    const formData = {
      className,
      sections: sectionsArray,
    };
    await onSubmit(formData);
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <Card className="w-full max-w-lg shadow-lg bg-white">
        <CardHeader className="flex flex-col items-center">
          <FaChalkboardTeacher className="text-4xl text-blue-600" />
          <CardTitle className="text-2xl mt-2 font-semibold">
            {isEditMode ? "Edit Class" : "Create New Class"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="className">Class Name</Label>
              <Input
                id="className"
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                required
                className="focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sections">Sections (comma-separated)</Label>
              <Input
                id="sections"
                type="text"
                value={sections}
                onChange={(e) => setSections(e.target.value)}
                required
                className="focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button type="submit" className="w-full flex items-center justify-center space-x-2">
              {isEditMode ? <FaEdit /> : <FaPlus />} <span>{isEditMode ? "Update Class" : "Create Class"}</span>
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default InstituteClassForm;

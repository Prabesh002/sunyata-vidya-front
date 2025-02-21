"use client";

import { ExamRoutineCreateDto, Class } from "@/types/exam";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ExamRoutineFormProps {
  onSubmit: (data: ExamRoutineCreateDto) => Promise<void>;
}

const ExamRoutineForm = ({ onSubmit }: ExamRoutineFormProps) => {
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const classData: Class = { className, section };
    await onSubmit({ class: classData });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-md">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="className" className="text-lg font-medium">Class Name</Label>
          <Input
            id="className"
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
            placeholder="Enter class name"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="section" className="text-lg font-medium">Section</Label>
          <Input
            id="section"
            type="text"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            required
            placeholder="Enter section"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Button
          type="submit"
          className="px-6 py-3 text-white bg-black rounded-full hover:bg-gray-900 transition-all duration-300"
        >
          Create Routine
        </Button>
      </div>
    </form>
  );
};

export default ExamRoutineForm;

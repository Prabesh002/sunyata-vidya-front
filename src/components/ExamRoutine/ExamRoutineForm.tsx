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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="className">Class Name</Label>
        <Input
          id="className"
          type="text"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="section">Section</Label>
        <Input
          id="section"
          type="text"
          value={section}
          onChange={(e) => setSection(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Create Routine</Button>
    </form>
  );
};

export default ExamRoutineForm;
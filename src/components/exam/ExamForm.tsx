"use client";

import { ExamCreateDto, ExamType, ExamUpdateDto } from "@/types/exam";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ExamFormProps {
  onSubmit: (data: ExamCreateDto | ExamUpdateDto) => Promise<void>; 
  initialValues?: ExamCreateDto | ExamUpdateDto; 
  isEditMode?: boolean;
}

const ExamForm = ({ onSubmit, initialValues, isEditMode }: ExamFormProps) => {
  const [examName, setExamName] = useState(initialValues?.examName || "");
  const [type, setType] = useState<ExamType>(
    initialValues?.type || ExamType.Test
  );
  const [startDate, setStartDate] = useState(initialValues?.startDate || "");
  const [endDate, setEndDate] = useState(initialValues?.endDate || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData: ExamCreateDto | ExamUpdateDto = {
      examName,
      type,
      startDate,
      endDate,
    };
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="examName">Exam Name</Label>
        <Input
          id="examName"
          type="text"
          value={examName}
          onChange={(e) => setExamName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="type">Exam Type</Label>
        <Select
          value={type.toString()}
          onValueChange={(value) => setType(parseInt(value) as ExamType)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select exam type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ExamType.Test.toString()}>Test</SelectItem>
            <SelectItem value={ExamType.Terminal.toString()}>Terminal</SelectItem>
            <SelectItem value={ExamType.Final.toString()}>Final</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="startDate">Start Date</Label>
        <Input
          id="startDate"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="endDate">End Date</Label>
        <Input
          id="endDate"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </div>
      <Button type="submit">{isEditMode ? "Update Exam" : "Create Exam"}</Button>
    </form>
  );
};

export default ExamForm;
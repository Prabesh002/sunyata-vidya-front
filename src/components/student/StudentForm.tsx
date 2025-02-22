"use client";

import { StudentCreateDto, StudentUpdateDto } from "@/types/student";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { FaUserGraduate, FaPlus, FaEdit } from "react-icons/fa";
import StudentSelector from "./StudentSelector";


interface StudentFormProps {
    onSubmit: (data: StudentCreateDto | StudentUpdateDto) => Promise<void>;
    initialValues?: StudentCreateDto | StudentUpdateDto;
    isEditMode?: boolean;
}

const StudentForm = ({ onSubmit, initialValues, isEditMode }: StudentFormProps) => {
    const [name, setName] = useState(initialValues?.name || "");
    const [instituteClassId, setInstituteClassId] = useState(initialValues?.instituteClassId || "");
    const [currentSection, setCurrentSection] = useState(initialValues?.currentSection || "");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = {
            name,
            instituteClassId,
            currentSection,
        };
        await onSubmit(formData);
    };

    return (
        <section className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
            <Card className="w-full max-w-lg shadow-lg bg-white">
                <CardHeader className="flex flex-col items-center">
                    <FaUserGraduate className="text-4xl text-blue-600" />
                    <CardTitle className="text-2xl mt-2 font-semibold">
                        {isEditMode ? "Edit Student" : "Create New Student"}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="instituteClass">Institute Class</Label>
                            <StudentSelector setValue={setInstituteClassId}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="currentSection">Current Section</Label>
                            <Input
                                id="currentSection"
                                type="text"
                                value={currentSection}
                                onChange={(e) => setCurrentSection(e.target.value)}
                                required
                                className="focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <Button type="submit" className="w-full flex items-center justify-center space-x-2">
                            {isEditMode ? <FaEdit /> : <FaPlus />} <span>{isEditMode ? "Update Student" : "Create Student"}</span>
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </section>
    );
};

export default StudentForm;
"use client";

import { useEffect, useState } from "react";
import { get } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/routes";
import { InstituteClassListDto } from "@/types/institute-class";
import { Label } from "@/components/ui/label";
import { Select, SelectItem } from "@/components/ui/select"; // Importing Select and SelectItem components if available

interface StudentSelectorProps {
    setValue: (value: string) => void;
}

const StudentSelector = ({ setValue }: StudentSelectorProps) => {
    const [instituteClasses, setInstituteClasses] = useState<InstituteClassListDto[]>([]);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const classesData = await get<InstituteClassListDto[]>(API_ENDPOINTS.INSTITUTE_CLASS);
                setInstituteClasses(classesData);
            } catch (error: any) {
                console.error(error);
            }
        };

        fetchClasses();
    }, []);

    return (
        <div className="space-y-2">
            <Label htmlFor="instituteClass">Institute Class</Label>
            <select
                id="instituteClass"
                onChange={(e) => setValue(e.target.value)}
                className="w-full focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Select Institute Class</option>
                {instituteClasses.map((instituteClass) => (
                    <option key={instituteClass.id} value={instituteClass.id}>
                        {instituteClass.className}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default StudentSelector;

"use client";

import { useEffect, useState } from "react";
import { get } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/routes";
import { InstituteClassListDto } from "@/types/institute-class";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface StudentSelectorProps {
    setValue: (value: string) => void
}

const StudentSelector = ({ setValue }:StudentSelectorProps) => {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const [instituteClasses, setInstituteClass] = useState<InstituteClassListDto[]>([]);
    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const classesData = await get<InstituteClassListDto[]>(API_ENDPOINTS.INSTITUTE_CLASS);
                setInstituteClass(classesData);
            } catch (error: any) {
                console.error(error);
            }
        };

        fetchClasses();
    }, []);
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Add +</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Student</DialogTitle>
                    <DialogDescription>
                        Make sure add the student the correct information.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" value={name} className="col-span-3" onChange={event => setName(event.target.value)} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="class" className="text-right">
                            Class
                        </Label>
                        <select onChange={e => setValue(e.target.value)}>
                            {instituteClasses.map(instituteClass => (
                                <option key={instituteClass.id} value={instituteClass.id}>{instituteClass.className}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default StudentSelector
"use client";

import { useEffect, useState } from "react";
import { get } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/routes";
import { InstituteClassListDto } from "@/types/institute-class";
import Link from "next/link";
import InstituteClassList from "@/src/components/institute-class/InstituteClassList";
import Loader from "@/src/UI/Loading";

const InstituteClassPage = () => {
  const [classes, setClasses] = useState<InstituteClassListDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      setError(null);
      try {
        const classesData = await get<InstituteClassListDto[]>(API_ENDPOINTS.INSTITUTE_CLASS);
        setClasses(classesData);
      } catch (error: any) {
        setError(error.message || "Failed to fetch institute classes");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  if (loading) {
    return <Loader> </Loader>
  }

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Institute Classes</h1>
      <InstituteClassList classes={classes} />
      <Link href="/institute-class/create">Create New Class</Link>
    </div>
  );
};

export default InstituteClassPage;
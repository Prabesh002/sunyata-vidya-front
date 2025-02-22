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
    return <Loader />;
  }

  if (error) {
    return (
      <div
        style={{
          color: "red",
          padding: "20px",
          border: "2px solid red",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        Error: {error}
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "1200px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "30px" }}>Institute Classes</h1>
      <InstituteClassList classes={classes} />

      <div style={{ marginTop: "30px" }}>
        <Link
          href="/institute-class/create"
          style={{
            backgroundColor: "#111",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: "50px",
            textDecoration: "none",
            fontSize: "16px",
            transition: "background-color 0.3s",
            display: "inline-block", 
            margin: "0 auto",
          }}
        >
          Create New Class
        </Link>
      </div>
    </div>
  );
};

export default InstituteClassPage;

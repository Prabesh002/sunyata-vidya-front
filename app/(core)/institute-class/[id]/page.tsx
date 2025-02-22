"use client";

import { useEffect, useState } from "react";
import { get } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/routes";
import { InstituteClassListDto } from "@/types/institute-class";
import { useParams } from "next/navigation";
import Link from "next/link";
import InstituteClassDetails from "@/src/components/institute-class/InstituteClassDetails";
import Loader from "@/src/UI/Loading";

const InstituteClassDetailsPage = () => {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : params.id?.[0];

  const [instituteClass, setInstituteClass] = useState<InstituteClassListDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchInstituteClassDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const instituteClassData = await get<InstituteClassListDto>(API_ENDPOINTS.INSTITUTE_CLASS_BY_ID(id));
        setInstituteClass(instituteClassData);
      } catch (error: any) {
        setError(error.message || "Failed to fetch institute class details");
      } finally {
        setLoading(false);
      }
    };

    fetchInstituteClassDetails();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div style={{ color: "red", padding: "20px", border: "2px solid red", borderRadius: "8px" }}>{error}</div>;
  }

  if (!instituteClass) {
    return <div style={{ padding: "20px", fontSize: "18px" }}>Institute class not found</div>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>Institute Class Details</h1>
      <InstituteClassDetails instituteClass={instituteClass} />

      <div style={{ marginTop: "30px" }}>
        <Link
          href={`/institute-class/${id}/edit`}
          style={{
            backgroundColor: "#111",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "50px",
            textDecoration: "none",
            fontSize: "16px",
            transition: "background-color 0.3s",
            display: "inline-block",
            margin: "0 auto", 
          }}
        >
          Edit Class
        </Link>
      </div>
    </div>
  );
};

export default InstituteClassDetailsPage;

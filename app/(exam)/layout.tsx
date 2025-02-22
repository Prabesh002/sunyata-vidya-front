import Layout from "@/components/common/Layout";

const ExamLayout = ({ children }: { children: React.ReactNode }) => {
  const navItems = [
    { label: "Exams", href: "/exams" },
    { label: "Create Exam", href: "/exams/create" },
  ];

  return <Layout navItems={navItems}>{children}</Layout>;
};

export default ExamLayout;
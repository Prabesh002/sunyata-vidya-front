import Layout from "@/components/common/Layout";

const ExamLayout = ({ children }: { children: React.ReactNode }) => {
  const navItems = [
    { label: "Classes", href: "/institute-class" },
    { label: "Create a class", href: "/institute-class/create" },
  ];

  return <Layout navItems={navItems}>{children}</Layout>;
};

export default ExamLayout;
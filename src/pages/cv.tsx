import Head from "next/head";
import { LayoutWithSidebar } from "@/components/layout/Layout";
import Cv from "@/components/cv/Cv";

export default function CvPage() {
  return (
    <LayoutWithSidebar>
      <Cv />
    </LayoutWithSidebar>
  );
}

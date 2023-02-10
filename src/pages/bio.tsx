import Head from "next/head";
import { LayoutWithSidebar } from "@/components/layout/Layout";
import Bio from "@/components/bio/Bio";

export default function BioPage() {
  return (
    <LayoutWithSidebar>
      <Bio />
    </LayoutWithSidebar>
  );
}

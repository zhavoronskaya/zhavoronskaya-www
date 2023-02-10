import Head from "next/head";
import Contact from "@/components/contact/Contact";
import { LayoutWithSidebar } from "@/components/layout/Layout";

export default function ContactPage() {
  return (
    <LayoutWithSidebar>
      <Contact />
    </LayoutWithSidebar>
  );
}

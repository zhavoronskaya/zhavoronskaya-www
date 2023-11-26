import React from "react";

import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
  children: React.ReactNode;
  headerSlot?: React.ReactNode;
};

export default function BaseLayout({ children, headerSlot }: LayoutProps) {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Header centerSlot={headerSlot} />

      <main
        className="flex-1 mx-4 bg-[#FAEBFF] rounded-xl overflow-hidden"
        style={{ border: "1px solid #F3CBFE" }}
      >
        <div className="h-full overflow-auto p-4">{children}</div>
      </main>

      <Footer />
    </div>
  );
}

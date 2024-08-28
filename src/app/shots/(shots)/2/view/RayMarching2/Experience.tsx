import { Suspense } from "react";

import CreateSDF from "./CreateSDF";

export default function Experience() {
  return (
    <Suspense fallback={null}>
      <CreateSDF />
    </Suspense>
  );
}

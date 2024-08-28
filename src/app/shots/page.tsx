import GridGallery from "@/components/GridGallery";
import BaseLayout from "@/components/BaseLayout/BaseLayout";

type Props = {};

const ShotsPage = ({}: Props) => {
  return (
    <BaseLayout>
      <div className="px-8">
        <div className="mt-12 sm:mt-24">
          <h1 className="text-hxlm sm:text-hxlt lg:text-hxl font-bold uppercase ">
            Gallery <br /> of digital art
          </h1>

          <span className="mt-4 sm:mt-6 block text-remarkm sm:text-remarkt lg:text-remark text-dissolve-color ">
            Where Code Meets Canvas: A Journey Through Generative Art
          </span>
        </div>
        <GridGallery />
      </div>
    </BaseLayout>
  );
};

export default ShotsPage;

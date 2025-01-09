import Image from "next/image";
import Image1 from "../../../public/banners/1.jpg";
import Image2 from "../../../public/banners/2.jpg";
import Image3 from "../../../public/banners/3.jpg";
import Image4 from "../../../public/banners/4.jpg";

const HomeBanner = () => {
  return (
    <div className="px-2 md:px-0 grid grid-cols-1 lg:grid-cols-6 gap-6 place-items-center">
      <div className="col-span-1 lg:col-span-3">
        <Image src={Image1} alt="Banner 1" className="rounded-xl " />
      </div>
      <div className="col-span-1 lg:col-span-2 space-y-6 ">
        <Image src={Image2} alt="Banner 2" className="rounded-xl" />
        <Image src={Image3} alt="Banner 3" className="rounded-xl" />
      </div>

      <div className="col-span-1 block md:hidden lg:block">
        <Image src={Image4} alt="Banner 4" className="rounded-xl " />
      </div>
    </div>
  );
};

export default HomeBanner;

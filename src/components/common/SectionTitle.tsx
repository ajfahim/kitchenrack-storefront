import Image from "next/image";

const SectionTitle = ({ title }: { title: string }) => {
  return (
    //  Title with decorative elements
    <div className="flex flex-col items-center mb-8">
      <h2 className="text-3xl font-semibold text-center">{title}</h2>
      <div className="flex items-center">
        <div className="h-[1px] w-16 bg-neutral/30"></div>
        <Image src="/star.png" alt="Star" width={24} height={24} />
        <div className="h-[1px] w-16 bg-neutral/30"></div>
      </div>
    </div>
  );
};

export default SectionTitle;

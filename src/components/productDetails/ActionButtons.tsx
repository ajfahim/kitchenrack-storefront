import { PhoneCall, ShoppingBag, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const ActionButtons = () => {
  return (
    <div className="space-y-5 lg:space-y-5">
      <div className="flex gap-4 mt-4">
        <Button className="flex-1 bg-primary py-6">
          <ShoppingBag />
          Add to Cart
        </Button>
        <Button variant={"secondary"} className="flex-1 py-6 space-x-2">
          <Zap />
          Buy Now
        </Button>
      </div>
      <Separator className="bg-gray-200" />
      <div className="w-full flex flex-wrap items-center justify-center gap-3 font-bold text-xl">
        <p>Call for details</p>
        <Link
          href="tel:+88012345678"
          className="flex items-center justify-center gap-2 font-medium text-lg"
        >
          <PhoneCall className="text-accent" />
          <p className="text-accent">+880 1234 5678</p>
        </Link>
      </div>
    </div>
  );
};

export default ActionButtons;

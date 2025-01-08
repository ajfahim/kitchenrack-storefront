import { MailSearch, MapPin, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FooterLogo from "../../../public/footerLogo.png";

import fbLogo from "../../../public/facebook.png";
import WhatsappLogo from "../../../public/whatsapp.png";
const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  const siteInfo = {
    name: "Kitchen Rack",
    nameBn: "কিচন র্যাক",
    domain: "https://kitchenrackbd.com",
    address: "House: 8/10, Road: 15, Sector: 10, Uttara, Dhaka",
    phone: "+8801521216404",
    email: "info@kitchenrackbd.com",
    facebookLink: "https://facebook.com/kitchenrackbd",
    whatsappNumber: "+8801521216404",
  };

  return (
    <footer className="bg-primary mt-10">
      <div className="container px-2 xl:px-0 mx-auto grid grid-cols-1 md:grid-cols-4 place-items-center md:place-items-start py-20">
        <div className=" size-40">
          <Image src={FooterLogo} alt="footer-logo" />
        </div>
        <div>
          <div className="text-xl font-bold">We Are Here</div>
          <div className="space-y-2 mt-4 ">
            <div className="flex gap-2 hover:text-accent">
              <div>
                <MapPin className=" font-bold" />
              </div>
              <div className="text-lg">{siteInfo.address}</div>
            </div>
            <div className="text-lg flex items-center gap-2 hover:text-accent">
              <div>
                <PhoneCall className="font-bold" />
              </div>
              <a href={`tel:${siteInfo.phone}`} target="_blank">
                {siteInfo.phone}
              </a>
            </div>
            <div className="text-lg flex items-center gap-2 hover:text-accent">
              <div>
                <MailSearch className="font-bold" />
              </div>
              <a href={`mailto:${siteInfo.email}`} target="_blank">
                {siteInfo.email}
              </a>
            </div>
          </div>
        </div>
        <div className="">
          <div className="text-xl font-bold">Company links</div>
          <div className="gap-2 mt-4 flex flex-col text-lg font-semibold">
            <Link href="/about" className="hover:text-accent">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-accent">
              Contact Us
            </Link>
            <Link href="/contact" className="hover:text-accent">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-accent">
              Terms & Conditions
            </Link>
          </div>
        </div>
        <div>
          <div className="text-xl font-bold">Social Links</div>
          <div className="gap-2 flex text-lg font-semibold mt-4">
            <Link href={siteInfo.facebookLink} target="_blank">
              <Image src={fbLogo} alt="fb-logo" />
            </Link>
            <Link
              href={`https://wa.me/${siteInfo.whatsappNumber}`}
              target="_blank"
            >
              <Image src={WhatsappLogo} alt="whatsapp-logo" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

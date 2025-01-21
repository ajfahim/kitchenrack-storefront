import { Building, CreditCard, Home, Package } from "lucide-react";

const DeliveryInfo = () => {
  const deliveryInfo = [
    {
      icon: <Building className="size-8 text-accent" />,
      label: "Delivery Charge:",
      detail: "Inside Dhaka - 60 BDT",
    },
    {
      icon: <Home className="size-8 text-accent" />,
      label: "Delivery Charge:",
      detail: "Outside Dhaka - 120 BDT",
    },
    {
      icon: <Package className="size-8 text-accent" />,
      label: "Cash on Delivery",
      detail: "Available Nationwide",
    },
    {
      icon: <CreditCard className="size-8 text-accent" />,
      label: "Secure Payment",
      detail: "Easy payment options",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-slate-50  border-slate-200 ">
      {deliveryInfo.map((item, index) => (
        <div key={index} className="flex items-center gap-4">
          {item.icon}
          <div>
            <p className="text-lg font-medium text-gray-700">{item.label}</p>
            <p className="text-lg text-gray-500">{item.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeliveryInfo;

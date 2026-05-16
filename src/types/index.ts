export type CarImage = {
  url: string;
  alt: string;
  type: "exterior" | "interior";
};

export type CarVariantSpec = {
  engine: string;
  transmission: string;
  power: string;
  torque: string;
  fuelType: string;
  seats: number;

  dimensions?: {
    length: number;
    width: number;
    height: number;
    wheelbase: number;
  };

  // 🔋 NEW (EV / Hybrid Support)
  battery?: {
    capacity?: string;        // contoh: "69.2 kWh"
    type?: string;            // Lithium Iron Phosphate
  };

  range?: {
    electric?: string;        // contoh: "530 km"
    hybrid?: string;          // contoh: "1000+ km"
  };

  drivetrain?: string;        // FWD, AWD

  charging?: {
    ac?: string;              // AC Charging
    dc?: string;              // DC Fast Charging
  };

  features: string[];
};

export type CarVariant = {
  name: string;
  price: number;
  transmission: "MT" | "AT" | "CVT" | "Single Speed" | "Dedicated Hybrid Transmission";
  specs: CarVariantSpec;
};

export type Car = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: "SUV" | "MPV" | "Hatchback" | "Sedan" | "Electric";
  thumbnail: string;
  images: CarImage[];
  variants: CarVariant[];
  highlights: string[];
  isNew?: boolean;
  isElectric?: boolean;
};

export type DealerInfo = {
  name: string;
  address: string;
  city: string;
  phone: string;
  whatsapp: string;
  email: string;
  hours: {
    weekday: string;
    saturday: string;
    sunday: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
};

export type TestDriveForm = {
  name: string;
  phone: string;
  email: string;
  carInterest: string;
  preferredDate: string;
  message?: string;
};
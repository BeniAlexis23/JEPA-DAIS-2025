import { title } from "process";

export const footerlabels: { label: string; herf: string }[] = [
  { label: "Ciencias Naturales", herf: "#" },
  { label: "Ingeniería y Tecnología", herf: "#" },
];

export const pricedeta: {
  title: string;
  icon: string;
  background: string;
  width: number;
  height: number;
  padding: string;
}[] = [
    {
      title: "Matemáticas Aplicadas",
      icon: "images/icons/calculating.png",
      background: "bg-light_grey",
      width: 42,
      height: 42,
      padding: "px-4 py-2",
    },
    {
      title: "Estadísticas y probabilidades",
      icon: "images/icons/monitor.png",
      background: "bg-light_grey",
      width: 42,
      height: 42,
      padding: "px-4 py-2",
    },
    {
      title: "Ciencias de la computación",
      icon: "images/icons/developer.png",
      background: "bg-light_grey",
      width: 42,
      height: 42,
      padding: "px-4 py-2",
    },
    {
      title: "Telecomunicaciones",
      icon: "images/icons/communication.png",
      background: "bg-light_grey",
      width: 42,
      height: 42,
      padding: "px-4 py-2",
    },
    {
      title: "Ingeniería de sistemas y comunicaciones",
      icon: "images/icons/engineering.png",
      background: "bg-light_grey",
      width: 42,
      height: 42,
      padding: "px-4 py-2",
    },
    {
      title: "Hardware y arquitectura de computadoras",
      icon: "images/icons/motherboard.png",
      background: "bg-light_grey",
      width: 42,
      height: 42,
      padding: "px-4 py-2",
    },
    {
      title: "Otras ingenierías y tecnologías",
      icon: "images/icons/graduation.png",
      background: "bg-light_grey",
      width: 42,
      height: 42,
      padding: "px-4 py-2",
    },
  ];

export const portfolioData: { image: string; title: string }[] = [
  {
    image: "images/portfolio/icon-wallet.svg",
    title: "Manage your portfolio",
  },
  {
    image: "images/portfolio/icon-vault.svg",
    title: "Vault protection",
  },
  {
    image: "images/portfolio/icon-mobileapp.svg",
    title: "Mobile apps",
  },
];

export const upgradeData: { title: string }[] = [
  { title: "100% Secure" },
  { title: "A Fraction of the Cost" },
  { title: "More Durable" },
  { title: "Easier to Use" },
];

export const perksData: {
  icon: string;
  title: string;
  text: string;
  space: string;
}[] = [
    {
      icon: "/images/perks/icon-support.svg",
      title: "24/7 Support",
      text: "Need help? Get your requests solved quickly via support team.",
      space: "lg:mt-8",
    },
    {
      icon: "/images/perks/icon-community.svg",
      title: "Community",
      text: "Join the conversations on our worldwide OKEx communities",
      space: "lg:mt-14",
    },
    {
      icon: "/images/perks/icon-academy.svg",
      title: "Academy",
      text: "Learn blockchain and<br /> crypto for free.",
      space: "lg:mt-4",
    },
  ];

export const CryptoData: { name: string; price: number }[] = [
  { name: "Bitcoin BTC/USD", price: 67646.84 },
  { name: "Ethereum ETH/USD", price: 2515.93 },
  { name: "Bitcoin Cash BTC/USD", price: 366.96 },
  { name: "Litecoin LTC/USD", price: 61504.54 },
];

import { getImagePrefix } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center h-full">
      <Image
        src={`${getImagePrefix()}images/logo/logo-dais.png`}
        alt="logo"
        width={120}
        height={40}
        className="h-12 w-auto lg:scale-150" // antes h-12
        quality={100}
        priority
      />
    </Link>
  );
};

export default Logo;
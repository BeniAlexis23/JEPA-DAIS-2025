import { getImagePrefix } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center h-full" aria-label="Ir al inicio">
      <Image
        src={`${getImagePrefix()}images/logo/epis-logo.png`}
        alt="Escuela Profesional de Ingeniería de Sistemas"
        width={220}
        height={64}
        className="h-10 w-auto sm:h-12 lg:h-14"
        quality={100}
        priority
      />
    </Link>
  );
};

export default Logo;

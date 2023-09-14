import Image from 'next/image';
import Link from 'next/link';
import Logo from 'public/logo.png';

import { ROUTES } from '@/constants/routes';

const Navigation = () => {
  return (
    <header className="flex shrink-0 border border-gray-200/70 bg-white px-6 py-3">
      <Link href={ROUTES.HOME} className="w-fit">
        <Image width={36} height={36} src={Logo} alt="careerboost logo" />
      </Link>
    </header>
  );
};

export default Navigation;

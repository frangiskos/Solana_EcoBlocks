'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Disclosure } from '@headlessui/react';
import { SignInButton } from '@/components/HomePage/SignInButton';

export default function NavMenu() {
  return (
    <Disclosure as="nav" className="flex justify-between items-center bg-gray-800 p-5">
      <div>
        <Link href={'/'}>
          <Image
            src="/logo.png" // Route of the image file
            width={160}
            height={20}
            alt="EcoBlocks Logo"
            className="h-5"
          />
        </Link>
      </div>

      <div className="space-x-4">
        <ul className="flex justify-between items-center space-x-4">
          <li className="text-white">
            <Link href={'/seller'}>Sellers</Link>
          </li>
          <li className="text-white">
            <Link href={'/consumers'}>Consumers</Link>
          </li>
          <li className="text-white">
            <Link href={'/recyclers'}>Recyclers</Link>
          </li>
        </ul>
      </div>

      <div>
        <SignInButton />
      </div>
    </Disclosure>
  );
}

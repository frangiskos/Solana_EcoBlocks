'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Disclosure } from '@headlessui/react';
import { IsAuth } from '@/components/Shared/AuthCheck';
import { SignInButton, SignOutButton } from '@/components/Shared/Buttons';

export default function NavMenu() {
  return (
    <Disclosure as="nav" className="flex justify-between items-center bg-gray-800 p-5">
      <div>
        <Link href={'/'}>
          <Image
            src="/logo.png" // Route of the image file
            width={260}
            height={1}
            alt="NextSpace Logo"
            className="h-10"
          />
        </Link>
      </div>

      <div className="space-x-4">
        <ul className="flex justify-between items-center space-x-4">
          <li className="text-white">
            <Link href={'/seller'}>Seller</Link>
          </li>
          <li className="text-white">
            <Link href={'/consumer'}>Consumer</Link>
          </li>
          <li className="text-white">
            <Link href={'/recycler'}>Recycler</Link>
          </li>
        </ul>
      </div>

      <div>
        <SignInButton />
        <SignOutButton />
        {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign In</button>
        <IsAuth>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign Out</button>
        </IsAuth> */}
      </div>
    </Disclosure>
  );
}

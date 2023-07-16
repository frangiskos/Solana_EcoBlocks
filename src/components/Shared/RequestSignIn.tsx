import Link from 'next/link';
import Image from 'next/image';

export default function RequestSignIn() {
  const authLink = '/auth/login';
  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Link href={authLink}>
          <div className="relative h-96">
            <Image
              src="/images/recycling-login.jpg?1"
              fill={true}
              quality={80}
              style={{ objectFit: 'cover' }}
              alt="Start recycling"
              className="p-8 rounded-t-lg"
            />
          </div>
        </Link>

        <div className="px-5 pb-5">
          <Link href={authLink} className="flex items-center justify-center">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Login to join us in recycling
            </h5>
          </Link>

          <div className="flex items-center justify-center mt-7 mb-4">
            <Link href={authLink} className="btn btn-wide">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

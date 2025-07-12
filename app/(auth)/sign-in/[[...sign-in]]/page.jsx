import { SignIn } from '@clerk/nextjs';
import { Fullscreen } from 'lucide-react';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      
      {/* Left: Image */}
      <div>
        <Image
          src="/login.jpg"
          alt="login"
          width={100}
          height={100}
          className="w-full object-contain"
        />
      </div>

      {/* Right: Sign-in */}
      <div className="flex justify-center items-center h-screen">
        <SignIn />
      </div>
      
    </div>
  );
}

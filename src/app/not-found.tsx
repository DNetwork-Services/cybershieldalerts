import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-7xl md:text-8xl font-display font-bold text-cyber-cyan mb-2">404</h1>
        <div className="w-16 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-green mx-auto rounded-full mb-6" />
        <h2 className="text-2xl font-display font-bold text-white mb-3">Page Not Found</h2>
        <p className="text-gray-400 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="hb-button">
          Return Home
        </Link>
      </div>
    </div>
  );
}

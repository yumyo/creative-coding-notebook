import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import p5 from 'p5';

// Dynamically import P5Wrapper with no SSR
const P5Wrapper = ({ sketch }) => {
  const p5Ref = useRef(); // Reference for the p5 instance
  const [isClient, setIsClient] = useState(false); // Client-side detection

  useEffect(() => {
    // Only set the client-side state if window is defined (client-side)
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      // Initialize the p5.js sketch only after confirming client-side
      const p5Instance = new p5(sketch, p5Ref.current);

      // Cleanup the p5.js instance on component unmount
      return () => {
        p5Instance.remove();
      };
    }
  }, [isClient, sketch]);

  // Avoid rendering until client-side is confirmed
  if (!isClient) {
    return null; // Don't render anything during SSR
  }

  return <div ref={p5Ref} style={{ width: '100%', height: '400px' }} />;
};

// Dynamically import with SSR disabled
export default dynamic(() => Promise.resolve(P5Wrapper), { ssr: false });
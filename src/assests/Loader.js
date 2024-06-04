import React, { useState,useEffect } from 'react';

const LoaderScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Function to simulate loading (you can replace it with your actual loading logic)
  const simulateLoading = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Simulating 3 seconds of loading
  };

  // Call simulateLoading when component mounts
  useEffect(() => {
    simulateLoading();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="flex bg-black items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : (
        <div>
          {/* Content to show after loading */}
        </div>
      )}
    </div>
  );
};

export default LoaderScreen;

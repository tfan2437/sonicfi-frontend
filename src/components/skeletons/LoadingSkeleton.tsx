import "./LoadingSkeleton.css";

const LoadingSkeleton = ({ height }: { height: string }) => {
  return (
    <div className="w-full h-full flex justify-center items-center relative">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="p-4 rounded-lg z-50 flex flex-col items-center justify-center">
          <span className="text-white text-2xl font-bold">Loading...</span>
          <span className="text-zinc-300 text-sm">
            We are preparing best content for you
          </span>
        </div>
      </div>
      <div className="animation-container" style={{ height: height }}>
        <div className="animation-wrapper">
          <ul className="animation-list">
            {Array.from({ length: 25 }, (_, i) => (
              <li key={i} className="animation-item"></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;

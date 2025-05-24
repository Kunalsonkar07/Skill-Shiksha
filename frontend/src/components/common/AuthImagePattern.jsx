const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center p-12" style={{ backgroundColor: "#15191e" /* a light gray */ }}>
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl ${i % 2 === 0 ? "animate-pulse" : ""}`}
              style={{ backgroundColor: i % 2 === 0 ? "#605dff" /* blue */ : "#605dff" /* darker blue */ }}
            />
          ))}
        </div>
        <h2 className="text-2xl text-white font-bold mb-4">{title}</h2>
        <p className="text-white">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;

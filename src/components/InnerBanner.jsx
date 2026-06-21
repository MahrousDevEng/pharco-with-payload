"use client";

const InnerBanner = ({ title, type = "image", src = "/images/hepc.gif" }) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 h-3/4 bg-gradient-to-b from-black/80 to-transparent z-10" />
      {/* Title overlay */}
      <div className="absolute top-1/2 -mb-20 translate-y-[-50%] text-center w-full z-10">
        <h2 className="text-white font-bold text-6xl">{title}</h2>
      </div>

      {/* Dynamic media */}
      {type === "video" ? (
        <video
          className="w-full h-96 object-cover object-bottom"
          src={src}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <img
          className="w-full h-96 object-cover object-bottom"
          src={src}
          alt={title}
        />
      )}
    </div>
  );
};

export default InnerBanner;

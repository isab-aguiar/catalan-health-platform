export default function ImageWithCredit({
  src,
  alt,
  credit,
  caption,
  className = "",
  creditPosition = "below",
  centered = false,
}) {
  return (
    <div className={`relative ${className} ${centered ? "mx-auto" : ""}`}>
      <div className="relative rounded-lg overflow-hidden shadow-sm border border-neutral-200">
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-cover"
          loading="lazy"
        />

        {caption && (
          <div className="bg-neutral-50 px-4 py-2 border-t border-neutral-200">
            <p className="text-sm text-neutral-700">{caption}</p>
          </div>
        )}

        {credit && creditPosition === "bottom-right" && (
          <div className="absolute bottom-0 right-0 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-tl-lg">
            <p className="text-xs text-white italic">{credit}</p>
          </div>
        )}
      </div>

      {credit && creditPosition === "below" && (
        <p className="text-xs text-neutral-500 italic mt-2 text-right">
          Fonte: {credit}
        </p>
      )}
    </div>
  );
}

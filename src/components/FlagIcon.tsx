interface FlagIconProps {
  code: string;
  className?: string;
}

export function FlagIcon({ code, className = "" }: FlagIconProps) {
  const lower = code.toLowerCase();

  return (
    <img
      src={`https://flagcdn.com/w80/${lower}.png`}
      srcSet={`https://flagcdn.com/w80/${lower}.png 1x, https://flagcdn.com/w160/${lower}.png 2x`}
      alt=""
      loading="lazy"
      className={`inline-block object-cover ${className}`}
    />
  );
}

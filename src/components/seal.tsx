export function Seal({ char }: { char: string }) {
  return (
    <span className="seal -rotate-6 transition-transform duration-500 ease-out group-hover:-rotate-[14deg]">
      {char}
    </span>
  );
}

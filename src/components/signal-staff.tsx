export function SignalStaff() {
  return (
    <div className="signal-staff" aria-hidden>
      {Array.from({ length: 7 }, (_, index) => (
        <span key={index} style={{ animationDelay: `${index * 0.28}s` }} />
      ))}
    </div>
  );
}

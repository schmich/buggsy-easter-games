interface ToastProps {
  message: string | null;
}

export default function Toast({ message }: ToastProps) {
  if (!message) return null;
  return (
    <div className="absolute top-[70px] left-1/2 -translate-x-1/2 z-50">
      <div className="bg-[#1a1a2e] text-white font-bold text-sm px-4 py-3 rounded-md shadow-lg">
        {message}
      </div>
    </div>
  );
}

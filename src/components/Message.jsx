export default function Message({ message, own }) {
  return (
    <div className={`flex ${own ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs px-3 py-2 rounded-2xl shadow ${
          own ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <span className="block text-[10px] opacity-60 mt-1">{message.email}</span>
      </div>
    </div>
  );
}

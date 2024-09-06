export default function ChatInput() {
  return (
    <div className="flex w-full items-center bg-white rounded-full p-2 shadow-md">
      <input
        type="text"
        placeholder="Message"
        className="flex-grow p-2 rounded-full outline-none text-gray-600"
      />
      <button className="bg-transparent flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 text-blue-500">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </button>
    </div>
  );
}

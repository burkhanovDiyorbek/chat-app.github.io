export default function ChatUser() {
  return (
    <div className="w-full flex items-center p-4 shadow-sm bg-white">
      <img
        src="https://via.placeholder.com/40"
        alt={`${name}'s avatar`}
        className="w-10 h-10 rounded-full"
      />

      <div className="ml-3">
        <h4 className="text-sm font-semibold text-gray-800">{'name'}</h4>
        <div className="text-xs text-gray-500">
          {/* {status ? 'online' : 'offline'} <span className="text-gray-300">|</span>{' '}
          {status ? 'offline' : 'online'} */}
          online
        </div>
      </div>
    </div>
  );
}

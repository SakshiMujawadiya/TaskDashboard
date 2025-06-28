const GreetingBox = ({ name, onViewProfile }) => (
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold">👋 Hello, {name}</h2>
    <button
      onClick={onViewProfile}
      className="text-sm text-blue-600 underline hover:text-blue-800 transition"
    >
      View Profile
    </button>
  </div>
);

export default GreetingBox;

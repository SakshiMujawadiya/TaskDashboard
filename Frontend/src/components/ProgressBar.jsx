const ProgressBar = ({ completed, total }) => {
  const percentage = total ? (completed / total) * 100 : 0;
  console.log("📊 ProgressBar values:", { completed, total, percentage });

  return (
    <div className="w-full mt-2">
      <div className="w-full bg-gray-300 rounded-full h-4">
        <div
          className="bg-blue-600 h-4 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-sm font-semibold text-black mt-1 text-right">
        {completed} / {total} modules completed ({Math.round(percentage)}%)
      </p>
    </div>
  );
};

export default ProgressBar;

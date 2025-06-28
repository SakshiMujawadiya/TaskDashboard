const StatsCards = ({ total, completed, pending }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <div className="bg-blue-100 p-4 rounded">Total Modules: {total}</div>
    <div className="bg-green-100 p-4 rounded">Completed: {completed}</div>
    <div className="bg-red-100 p-4 rounded">Pending: {pending}</div>
  </div>
);

export default StatsCards;
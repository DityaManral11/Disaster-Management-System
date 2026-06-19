const StatCard = ({ title, count, icon }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition">

      <div className="flex justify-between items-center">

        <div>
          <p className="text-gray-500 dark:text-gray-400">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2 text-gray-800 dark:text-white">
            {count}
          </h2>
        </div>

        <div className="text-5xl">
          {icon}
        </div>

      </div>

    </div>
  );
};

export default StatCard;
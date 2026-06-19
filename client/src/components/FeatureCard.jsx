const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition">
      
      <div className="text-5xl mb-4">
        {icon}
      </div>

      <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
        {title}
      </h2>

      <p className="text-gray-600 dark:text-gray-300">
        {description}
      </p>

    </div>
  );
};

export default FeatureCard;
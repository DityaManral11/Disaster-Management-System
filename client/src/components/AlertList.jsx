const AlertList = () => {
  const alerts = [
    {
      id: 1,
      type: "Flood Warning",
      location: "Noida, Uttar Pradesh",
      severity: "High",
    },
    {
      id: 2,
      type: "Fire Alert",
      location: "Ghaziabad, Uttar Pradesh",
      severity: "Medium",
    },
    {
      id: 3,
      type: "Earthquake Advisory",
      location: "Gurguram, Haryana",
      severity: "Low",
    },
    {
      id: 4,
      type: "Medical Emergency",
      location: "Faridabad, Haryana",
      severity: "High",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Recent Alerts
      </h2>

      <div className="space-y-4">

        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="border-l-4 border-red-500 p-4 bg-red-50 dark:bg-gray-700 rounded"
          >

            <h3 className="font-semibold text-gray-800 dark:text-white">
              {alert.type}
            </h3>

            <p className="text-gray-600 dark:text-gray-300">
              📍 {alert.location}
            </p>

            <span className="text-red-600 dark:text-red-400 font-medium">
              Severity: {alert.severity}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
};

export default AlertList;
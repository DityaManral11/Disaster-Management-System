function AlertCard({ title = 'Alert title', message = 'Alert details appear here.', severity = 'warning' }) {
  return (
    <div className={`alert-card rounded-lg border p-4 ${severity === 'error' ? 'border-red-300 bg-red-50' : 'border-yellow-300 bg-yellow-50'}`}>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm">{message}</p>
    </div>
  )
}

export default AlertCard

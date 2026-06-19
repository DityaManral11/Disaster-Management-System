function ShelterCard({ name = 'Shelter Name', location = 'Location details', capacity = 'Capacity info' }) {
  return (
    <article className="shelter-card rounded-xl border p-4 shadow-sm bg-white">
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-sm text-slate-600 mb-2">{location}</p>
      <p className="text-sm">{capacity}</p>
    </article>
  )
}

export default ShelterCard

function SOSButton({ onClick }) {
  return (
    <button
      type="button"
      className="sos-button rounded-full bg-red-600 px-5 py-3 text-white font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
      onClick={onClick}
    >
      SOS
    </button>
  )
}

export default SOSButton

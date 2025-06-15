const originalCordinations = [50.0614, 19.9366]
const shiftedCordinations = [50.0614, 19.9016]

function getCenter() {
	return window.innerWidth >= 992 ? shiftedCordinations : originalCordinations
}

const map = L.map('map', {
	center: getCenter(),
	zoom: 13,
	zoomControl: false,
	scrollWheelZoom: false,
	dragging: false,
	doubleClickZoom: true,
	boxZoom: false,
	tap: false,
	keyboard: false,
})

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; OpenStreetMap, CartoDB',
}).addTo(map)

L.control.zoom({ position: 'topright' }).addTo(map)

L.marker(originalCordinations).addTo(map).bindPopup('Rose Beauty<br>ul. Piękna 1').openPopup()

window.addEventListener('resize', () => {
	map.setView(getCenter())
})

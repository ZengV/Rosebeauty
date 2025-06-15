const htmlElement = document.documentElement
const nav = document.querySelector('.nav')
const navBtn = document.querySelector('.burger-btn')
const allNavItems = document.querySelectorAll('.nav__items-link')
const navBtnBars = document.querySelector('.burger-btn__bars')

const footerYear = document.querySelector('.footer__year')

const updateAriaHidden = () => {
	if (window.innerWidth < 992) {
		nav.setAttribute('aria-hidden', 'true')
	} else {
		nav.removeAttribute('aria-hidden')
	}
}

updateAriaHidden()

const handleNav = () => {
	nav.classList.toggle('nav--active')
	htmlElement.classList.toggle('html--hidden')
	navBtn.classList.add('burger-btn__bars--active')
	if (nav.classList.contains('nav--active')) {
		navBtn.classList.add('burger-btn__bars--active')
		navBtn.setAttribute('aria-expanded', 'true')
		navBtn.setAttribute('aria-label', 'Zamknij menu nawigacji')
		nav.setAttribute('aria-hidden', 'false')
		setTimeout(() => {
			navBtnBars.classList.remove('burger-btn__bars--dark')
		}, 100)
	} else {
		navBtn.classList.remove('burger-btn__bars--active')
		nav.setAttribute('aria-hidden', 'true')
		navBtn.setAttribute('aria-label', 'Otwórz menu nawigacji')
		navBtn.setAttribute('aria-expanded', 'false')
		setTimeout(() => {
			checkColorBurger()
		}, 300)
	}
}
allNavItems.forEach(item => {
	item.addEventListener('click', () => {
		htmlElement.classList.remove('html--hidden')
		nav.classList.remove('nav--active')
		navBtn.classList.remove('burger-btn__bars--active')
		nav.setAttribute('aria-hidden', 'true')
		navBtn.setAttribute('aria-label', 'Otwórz menu nawigacji')
		navBtn.setAttribute('aria-expanded', 'false')
	})
})
const onResize = () => {
	updateAriaHidden()
}

const handleCurrentYear = () => {
	const year = new Date().getFullYear()
	footerYear.innerText = year
}

handleCurrentYear()
window.addEventListener('resize', onResize)
navBtn.addEventListener('click', handleNav)
navBtn.addEventListener('mouseenter', () => {
	navBtn.classList.add('burger-btn__bars--active')
})
navBtn.addEventListener('mouseleave', () => {
	if (!nav.classList.contains('nav--active')) {
		navBtn.classList.remove('burger-btn__bars--active')
	}
})

document.addEventListener('DOMContentLoaded', () => {
	const banner = document.getElementById('cookie-banner')
	const acceptBtn = document.getElementById('accept-cookies')
	const rejectBtn = document.getElementById('reject-cookies')

	const consent = localStorage.getItem('cookieConsent')

	if (!consent) {
		banner.style.display = 'block'
	}

	acceptBtn.addEventListener('click', () => {
		localStorage.setItem('cookieConsent', 'accepted')
		banner.style.display = 'none'
	})

	rejectBtn.addEventListener('click', () => {
		localStorage.setItem('cookieConsent', 'rejected')
		banner.style.display = 'none'
	})
})

AOS.init({
	duration: 800,
	easing: 'ease-in-out',
	once: true,
})

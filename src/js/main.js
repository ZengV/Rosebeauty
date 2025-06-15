const htmlElement = document.documentElement
const nav = document.querySelector('.nav')
const navBtn = document.querySelector('.burger-btn')
const allNavItems = document.querySelectorAll('.nav__items-link')
const navBtnBars = document.querySelector('.burger-btn__bars')

const opinionsBox = document.querySelector('.opinions__box')
const opinions = document.querySelectorAll('.opinions__box-opinion')
const arrowLeft = document.querySelector('.opinions__arrow--left')
const arrowRight = document.querySelector('.opinions__arrow--right')
const opinionsPager = document.querySelector('.opinions__pager')

const contactBox = document.querySelector('.contact__box')
const contactBtn = document.querySelector('.contact__icon')
const contactSection = document.querySelector('.contact')
const footerYear = document.querySelector('.footer__year')

let currentSlide = 0
let isAnimating = false
let opinionsPerSlide = 1
let totalSlides = 0

const updateAriaHidden = () => {
	if (window.innerWidth < 992) {
		nav.setAttribute('aria-hidden', 'true')
	} else {
		nav.removeAttribute('aria-hidden')
	}
}

updateAriaHidden()
const updateAriaHiddenOpinions = () => {
	const start = currentSlide * opinionsPerSlide
	const end = start + opinionsPerSlide

	opinions.forEach((opinion, index) => {
		if (index >= start && index < end) {
			opinion.removeAttribute('aria-hidden')
		} else {
			opinion.setAttribute('aria-hidden', 'true')
		}
	})
}

const calculateSlides = () => {
	const containerWidth = opinionsBox.offsetWidth
	const cardWidth = opinions[0].offsetWidth

	opinionsPerSlide = Math.floor(containerWidth / cardWidth)
	totalSlides = Math.ceil(opinions.length / opinionsPerSlide)

	if (window.innerWidth < 992 && totalSlides > 1) {
		totalSlides -= 1
	}
}

const slideTo = opinion => {
	if (isAnimating) return
	isAnimating = true

	const cardWidth = opinions[0].offsetWidth + 19.9
	const moveX = opinion * opinionsPerSlide * cardWidth

	opinionsBox.style.transition = 'transform 0.4s ease-in-out'
	opinionsBox.style.transform = `translateX(-${moveX}px)`

	updateDots()
	updateAriaHiddenOpinions()
	generateDots()

	setTimeout(() => {
		isAnimating = false
	}, 400)
}

const updateSlider = () => {
	calculateSlides()
	if (currentSlide >= totalSlides) currentSlide = totalSlides - 1
	slideTo(currentSlide)
}

const generateDots = () => {
	opinionsPager.innerHTML = ''
	for (let i = 0; i < totalSlides; i++) {
		const button = document.createElement('button')
		button.setAttribute('type', 'button')
		button.className = 'opinions__pager-dot-btn'
		button.setAttribute('aria-label', `Przejdź do slajdu ${i + 1}`)
		if (i === currentSlide) {
			button.setAttribute('aria-current', 'true')
		}

		const icon = document.createElement('i')
		icon.classList.add('opinions__pager-dot', 'fa-circle', 'fa-regular')
		if (i === currentSlide) {
			icon.classList.remove('fa-regular')
			icon.classList.add('fa-solid')
		}

		button.appendChild(icon)

		button.addEventListener('click', () => {
			currentSlide = i
			slideTo(currentSlide)
		})

		opinionsPager.appendChild(button)
	}
}

const updateDots = () => {
	const dots = document.querySelectorAll('.opinions__pager-dot')
	dots.forEach((dot, i) => {
		dot.classList.toggle('fa-solid', i === currentSlide)
		dot.classList.toggle('fa-regular', i !== currentSlide)
	})
}

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
	updateSlider()
	updateAriaHiddenOpinions()
	updateAriaHidden()
}

const handleContact = () => {
	if (contactBox.classList.contains('contact__box-show')) {
		contactBox.classList.add('contact__box-hide')
		contactBox.classList.remove('contact__box-show')
		contactBtn.setAttribute('aria-label', 'Otwórz dane kontaktowe')
		contactBtn.setAttribute('aria-expanded', 'false')
	} else {
		contactBox.classList.add('contact__box-show')
		contactBox.classList.remove('contact__box-hide')
		contactBtn.setAttribute('aria-label', 'Zamknij dane kontaktowe')
		contactBtn.setAttribute('aria-expanded', 'true')
	}
}

const checkColorBurger = () => {
	const scrollY = window.scrollY + 50 || window.pageYOffset
	const contactTop = contact.offsetTop
	const contactHeight = contact.offsetHeight

	if (scrollY >= contactTop && scrollY < contactTop + contactHeight) {
		navBtnBars.classList.add('burger-btn__bars--dark')
	} else {
		navBtnBars.classList.remove('burger-btn__bars--dark')
	}
}

const handleCurrentYear = () => {
	const year = new Date().getFullYear()
	footerYear.innerText = year
}

handleCurrentYear()
window.addEventListener('resize', onResize)
window.addEventListener('DOMContentLoaded', updateAriaHiddenOpinions)
window.addEventListener('DOMContentLoaded', updateSlider)
window.addEventListener('scroll', checkColorBurger)
navBtn.addEventListener('click', handleNav)
contactBtn.addEventListener('click', handleContact)
arrowRight.addEventListener('click', () => {
	if (!isAnimating && currentSlide < totalSlides - 1) {
		currentSlide++
		slideTo(currentSlide)
	}
})
arrowLeft.addEventListener('click', () => {
	if (!isAnimating && currentSlide > 0) {
		currentSlide--
		slideTo(currentSlide)
	}
})

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

/**
 * CONFIGURATION
 */
const projects = [
	addProject({
		languageText: "Vanilla / Nestjs",
		projectNameText: "Tech News",
		clickCallback: () => {
			showProjectModal({
				title: "Tech News",
				options: [
					{
						label: "Frontend (Vanilla)",
						url: "https://github.com/4ndreello/tech-news",
					},
					{
						label: "Backend (Nestjs)",
						url: "https://github.com/4ndreello/tech-news-api",
					}
				]
			})
		},
		descriptionText:
			"Agregador de notícias de tecnologia com frontend em React e API em Node.js. Sistema completo com ranking inteligente e integração com múltiplas fontes.",
	}),
	addProject({
		languageText: "Next.js",
		projectNameText: "DOCUments",
		customURL: "https://github.com/docu-wiki-br/docu",
		descriptionText:
			"É uma simples Wiki que permite usuários criarem, editarem e deletarem DOCUmentos. Ainda em fase de desenvolvimento.",
	}),
	addProject({
		languageText: "Node.js / Express",
		projectNameText: "WebPolibrasil",
		clickCallback: () => {
			alert("Projeto privado :(")
		},
		descriptionText:
			"Um projeto CRUD privado para uma escola, que contém: cadastros (aluno, professor, turma, ...), emissão de boletim, relatórios, etc.",
	}),
]

////////////////////////////////////////////////////////////////////////////////////////////////////////////

const root_theme = document.querySelector(":root")
const storage = window.localStorage
const colors = { BLACK: "#000", WHITE: "#FFF" }

/**
 * WAKATIME CODING STATS
 */
async function loadCodingStats() {
	try {
		const response = await fetch("https://www.andreello.dev.br/api/stats")

		if (!response.ok) {
			throw new Error(`A API retornou um erro: ${response.status}`)
		}
		const data = await response.json()

		$("time-coding").textContent = data.timeCoding
		$("main-project").textContent = data.mainProject
		$("main-editor").textContent = data.mainEditor
		$("daily-average").textContent = data.dailyAverage

		updateLanguages(data.languages)

		animateStatValues()
	} catch (error) {
		console.error("Erro ao carregar coding stats:", error)
		showStatsError()
	}
}

function animateStatValues() {
	const statValues = document.querySelectorAll(".stat-value")
	statValues.forEach((stat, index) => {
		setTimeout(() => {
			stat.classList.add("loaded")
		}, index * 150)
	})
}

function updateLanguages(languages) {
	const container = $("languages-breakdown")

	const firstFive = languages.slice(0, 5)

	container.innerHTML = firstFive
		.map((lang, index) => {
			return `
			<div class="language-row" style="animation-delay: ${index * 0.1}s">
			  <div class="language-header">
				 <span class="language-name">${lang.name}</span>
				 <span class="language-time">${lang.time} (${lang.percent}%)</span>
			  </div>
			  <div class="progress-container">
				 <div class="progress-bar" style="width: ${lang.percent}%; animation-delay: ${
				index * 0.1 + 0.3
			}s"></div>
			  </div>
			</div>
		 `
		})
		.join("")
}

function showStatsError() {
	const container = $("languages-breakdown")
	container.innerHTML = `
	  <div class="error-message">
		 ⚠️ Erro ao carregar dados
	  </div>
	`
}

/**
 * SETUP
 */
// Exibe a joke assim que o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
       const jokes = [
	       'Ajeitando os pixels...',
	       'Compilando piadas ruins...',
	       'Buscando café no servidor...',
	       'Consultando Stack Overflow...',
	       'Chamando o Gabriel...',
	       'Fazendo deploy do loading...',
	       'Convertendo café em código...',
	       'undefined is not a function... ops!',
	       'Resolvendo promises que nunca cumpro...',
	       'Debugando em produção (não conte pra ninguém)...',
	       'Esperando o npm install terminar...',
	       '[object Object]... ops!',
	       'Copiando código do Stack Overflow...',
	       'Tentando entender meu próprio código...',
	       'git push --force (YOLO)...',
	       'Procurando o ponto e vírgula perdido...',
	       'Reiniciando o servidor pela 47ª vez...',
	       'Culpando o cache por tudo...',
	       'Funciona na minha máquina ¯\\_(ツ)_/¯',
	       'Refatorando código que já funciona...',
	       'Adicionando mais um framework JS...',
	       'Esperando o build... tempo de café!',
	       'NaN NaN NaN NaN',
	       'Prometo que vai carregar logo...',
       ];
       const joke = jokes[Math.floor(Math.random() * jokes.length)];
       const loadingJoke = document.getElementById('loading-joke');
       if (loadingJoke) loadingJoke.textContent = joke;
});

window.onload = () => {
       createTheme()
       setCurrentTheme()

       // Esconde o loading após aplicar o tema
       setTimeout(() => {
	       const loading = document.getElementById('global-loading')
	       if (loading) {
		       loading.classList.add('hide')
		       setTimeout(() => loading.remove(), 350)
	       }
       }, 500)

       const currentSemester = (dateFrom, dateTo) => {
	       const result =
		       dateTo.getMonth() -
		       dateFrom.getMonth() +
		       12 * (dateTo.getFullYear() - dateFrom.getFullYear())
	       return Math.ceil(result / 6)
       }

       $("semestre").textContent = currentSemester(
	       new Date("2022-01-01"),
	       new Date()
       )

       for (const project of projects) {
	       project()
       }

       loadCodingStats()
}

/**
 * UTILS
 */
function isMobile() {
	return Boolean(
		navigator.userAgent.match(/Android/i) ||
			navigator.userAgent.match(/webOS/i) ||
			navigator.userAgent.match(/iPhone/i) ||
			navigator.userAgent.match(/iPad/i) ||
			navigator.userAgent.match(/iPod/i) ||
			navigator.userAgent.match(/BlackBerry/i) ||
			navigator.userAgent.match(/Windows Phone/i)
	)
}

const $ = (id) => document.getElementById(id)

/**
 * THEME
 */
function createTheme() {
	const currentTheme = window.localStorage.getItem("theme")
	if (!currentTheme) {
		const navThemeDark =
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
		window.localStorage.setItem("theme", navThemeDark ? "black" : "white")
	}
}

function setCurrentTheme() {
	const IsWhiteTheme = storage.getItem("theme") === "white"
	root_theme.style.setProperty(
		"--bgColor",
		IsWhiteTheme ? colors.WHITE : colors.BLACK
	)
	root_theme.style.setProperty(
		"--textColor",
		IsWhiteTheme ? colors.BLACK : colors.WHITE
	)
	root_theme.style.setProperty(
		"--secondaryColor",
		IsWhiteTheme ? "rgb(181, 75, 75)" : "#532991"
	)
}

function changeTheme() {
	const currentTheme = window.localStorage.getItem("theme")
	window.localStorage.setItem(
		"theme",
		currentTheme === "white" ? "dark" : "white"
	)
	setCurrentTheme()
}

function addProject(data) {
	return () => {
		const { clickCallback, descriptionText, languageText, projectNameText } =
			data
		if (!descriptionText || !languageText || !projectNameText) {
			return
		}
		let url = `https://github.com/4ndreello/${projectNameText}`
		if (data.customURL) {
			url = data.customURL
		}
		const projectsContainer = $("projects")
		const container = document.createElement("div")
		try {
			container.className = "outline"
			const language = document.createElement("h2")
			language.textContent = languageText
			const projectName = document.createElement("h1")
			projectName.textContent = projectNameText
			projectName.style.wordBreak = ""
			const description = document.createElement("p")
			description.textContent = descriptionText
			container.appendChild(language)
			container.appendChild(projectName)
			container.appendChild(description)
			container.addEventListener("click", () => {
				if (clickCallback) {
					return clickCallback()
				}
				if (isMobile()) {
					window.open(url)
					return
				}
				window.open(url, "mozzilaWindow", "popup")
			})
		} finally {
			projectsContainer.appendChild(container)
		}
	}
}

/**
 * PROJECT MODAL
 */
function showProjectModal(data) {
	const { title, options } = data

	// Create overlay
	const overlay = document.createElement('div')
	overlay.className = 'project-modal-overlay'

	// Create modal
	const modal = document.createElement('div')
	modal.className = 'project-modal'

	// Create header
	const header = document.createElement('div')
	header.className = 'project-modal-header'

	const titleElement = document.createElement('h2')
	titleElement.className = 'project-modal-title'
	titleElement.textContent = title

	const closeButton = document.createElement('button')
	closeButton.className = 'project-modal-close'
	closeButton.innerHTML = '×'
	closeButton.onclick = () => closeModal(overlay)

	header.appendChild(titleElement)
	header.appendChild(closeButton)

	// Create options container
	const optionsContainer = document.createElement('div')
	optionsContainer.className = 'project-modal-options'

	// Create option elements
	options.forEach(option => {
		const optionElement = document.createElement('div')
		optionElement.className = 'project-modal-option'
		
		const icon = document.createElement('span')
		icon.className = 'project-modal-option-icon'
		icon.textContent = option.icon

		const label = document.createElement('span')
		label.className = 'project-modal-option-label'
		label.textContent = option.label

		optionElement.appendChild(icon)
		optionElement.appendChild(label)

		optionElement.onclick = () => {
			window.open(option.url, '_blank')
			closeModal(overlay)
		}

		optionsContainer.appendChild(optionElement)
	})

	// Assemble modal
	modal.appendChild(header)
	modal.appendChild(optionsContainer)
	overlay.appendChild(modal)

	// Close on overlay click
	overlay.onclick = (e) => {
		if (e.target === overlay) {
			closeModal(overlay)
		}
	}

	// Add to document
	document.body.appendChild(overlay)

	// Close on ESC key
	const handleEscape = (e) => {
		if (e.key === 'Escape') {
			closeModal(overlay)
			document.removeEventListener('keydown', handleEscape)
		}
	}
	document.addEventListener('keydown', handleEscape)
}

function closeModal(overlay) {
	overlay.style.animation = 'fadeOut 0.2s ease forwards'
	setTimeout(() => {
		overlay.remove()
	}, 200)
}

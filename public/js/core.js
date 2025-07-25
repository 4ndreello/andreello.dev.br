/**
 * CONFIGURATION
 */
const projects = [
	addProject({
		languageText: "Next.js",
		projectNameText: "DOCUments",
		customURL: "https://github.com/docu-wiki-br/docu",
		descriptionText:
			"É uma simples Wiki que permite usuários criarem, editarem e deletarem DOCUmentos. Ainda em fase de desenvolvimento.",
	}),
	addProject({
		languageText: "Java",
		projectNameText: "Java-Tree",
		descriptionText:
			"Ao passar uma arquivo HTML, ele pega o texto com o elemento mais profundo",
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
	addProject({
		languageText: "Java",
		projectNameText: "Java-Api",
		descriptionText: "Uma simples API usando Spring Boot e Java 17",
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
window.onload = () => {
	createTheme()
	setCurrentTheme()

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

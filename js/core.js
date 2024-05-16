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
]

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

const root_theme = document.querySelector(":root")
const storage = window.localStorage
const colors = { BLACK: "#000", WHITE: "#FFF" }

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
		window.localStorage.setItem("theme", "white")
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

const root_theme = document.querySelector(":root")
const storage = window.localStorage
const colors = { BLACK: "#000", WHITE: "#FFF" }

window.onload = () => {
	createTheme()
	setCurrentTheme()

	addProject({
		languageText: "Next.js",
		projectNameText: "DOCUments",
		customURL: "https://github.com/docu-wiki-br/docu",
		descriptionText:
			"É uma simples Wiki que permite usuários criarem, editarem e deletarem DOCUmentos.",
	})

	addProject({
		languageText: "Java",
		projectNameText: "Java-Tree",
		descriptionText:
			"Ao passar uma arquivo HTML, ele pega o texto com o elemento mais profundo",
	})
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
		IsWhiteTheme ? "rgb(181, 75, 75)" : "rgb(75, 78, 181)"
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

/**
 * GENERATE PROJECT BOXES
 */

function addProject(data) {
	const { descriptionText, languageText, projectNameText } = data

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

		const language = document.createElement("h1")
		language.textContent = languageText

		const projectName = document.createElement("h2")
		projectName.textContent = projectNameText

		const description = document.createElement("p")
		description.textContent = descriptionText

		container.appendChild(language)
		container.appendChild(projectName)
		container.appendChild(description)
		container.addEventListener("click", () => {
			window.open(url, "mozzilaWindow", "popup")
		})
	} finally {
		projectsContainer.appendChild(container)
	}
}

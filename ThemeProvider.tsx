import React, { useState, createContext, useContext, useEffect, useRef } from "react";

/**
 * Hook for mananaging theme, currently only dark mode
 */
export const useTheme = () => {
	const { darkMode, toggleDarkMode } = useContext(ThemeContext);
	return { toggleDarkMode, darkMode };
};

const ThemeContext = createContext({
	darkMode: true,
	toggleDarkMode: () => {},
});

export const ThemeProvider = ({ children }) => {
	const [darkMode, setDarkMode] = useState(false);
	const bodyRef = useRef<HTMLBodyElement>();
	const toggleDarkMode = () => {
		if (window && window.document&& document.getElementsByTagName("BODY")) {
			if (darkMode) {
				document.getElementsByTagName("BODY")[0].classList.add("mode-dark");
			} else {
				document.getElementsByTagName("BODY")[0].classList.remove("mode-dark");
			}
		}
		setDarkMode(!darkMode);
	};
	useEffect(() => {
		if (window && window.document && document.getElementsByTagName("BODY")) {
			if (darkMode) {
				document.getElementsByTagName("BODY")[0].classList.add("mode-dark");
			} else {
				document.getElementsByTagName("BODY")[0].classList.remove("mode-dark");
			}
		}
	});
	return (
		<ThemeContext.Provider value={{ toggleDarkMode, darkMode }}>
			{children}
		</ThemeContext.Provider>
	);
};

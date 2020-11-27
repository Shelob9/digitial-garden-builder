import React, {useEffect,useState} from "react";

import "./DarkModeToggle.module.css";
const DarkModeToggle = () => {
    const [isDark, setIsDarkMode] = useState(false);
    useEffect(() => {
        if (isDark) {
          document.body.className = 'dark-mode';
    
        } else {
          document.body.className = 'light-mode';
    
        }
      }, [isDark]);

  return (
    <label
      className="dark-mode-toggle"
      aria-label={isDark ? "Activate light mode" : "Activate dark mode"}
      title={isDark ? "Activate light mode" : "Activate dark mode"}
    >
      <input type="checkbox" checked={!isDark} onChange={() => setIsDarkMode(!isDark)} />
      <div />
    </label>
  );
};

export default DarkModeToggle;

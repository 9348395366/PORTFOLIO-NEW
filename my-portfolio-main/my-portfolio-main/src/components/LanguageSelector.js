import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/home.scss';

const languages = [
  { code: 'en', label: 'English', flag: 'US' },
  { code: 'hi', label: 'Hindi', flag: 'IN' },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (lngCode) => {
    i18n.changeLanguage(lngCode);
    setIsOpen(false);
  };

  const normalizedLang = (i18n.language || '').split('-')[0];
  const currentLang = languages.find((l) => l.code === normalizedLang) || languages[0];

  return (
    <div className="language-selector-container" ref={containerRef}>
      <button
        className={`lang-pill ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select Language"
      >
        <span className="lang-code">{currentLang.code.toUpperCase()}</span>
        <span className="dropdown-arrow">v</span>
      </button>

      {isOpen && (
        <div className="lang-dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`lang-option ${normalizedLang === lang.code ? 'selected' : ''}`}
              onClick={() => changeLanguage(lang.code)}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;

import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionIds.length) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 1. If at the very top of the page, always activate the first section ('home')
      if (scrollY < 100) {
        setActiveSection(sectionIds[0] || 'home');
        return;
      }

      // 2. If scrolled near the bottom of the page, activate the last section ('contact')
      if (scrollY + windowHeight >= documentHeight - 120) {
        setActiveSection(sectionIds[sectionIds.length - 1] || 'contact');
        return;
      }

      // 3. Trigger line at 35% of the viewport height from top
      const triggerY = windowHeight * 0.35;
      let currentSection = sectionIds[0] || 'home';

      for (let i = 0; i < sectionIds.length; i++) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section has reached or scrolled past the trigger line
          if (rect.top <= triggerY) {
            currentSection = id;
          }
        }
      }

      setActiveSection((prev) =>
        prev !== currentSection ? currentSection : prev
      );
    };

    // Run immediately on mount
    handleScroll();

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    window.addEventListener('hashchange', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('hashchange', handleScroll);
    };
  }, [sectionIds]);

  return activeSection;
}

import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let maxVisibleArea = 0;
        let mostVisibleSection = '';
        
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Check intersection ratio to pick the most visible section
            if (entry.intersectionRatio > maxVisibleArea) {
              maxVisibleArea = entry.intersectionRatio;
              mostVisibleSection = entry.target.id;
            }
          }
        });
        
        if (mostVisibleSection) {
          setActiveSection(mostVisibleSection);
        }
      },
      { rootMargin: '-20% 0px -40% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}

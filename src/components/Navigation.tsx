import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Calculate scroll position
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - 80; // Offset for fixed header

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { label: 'Work', id: 'featured-work' },
    { label: 'Notes', id: 'technical-notes' },
    { label: 'Stack', id: 'tech-stack' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'cta' },
  ];

  return (
    <>
      {/* Fixed Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#07080B]/90 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
        style={{ zIndex: 1000 }}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-semibold text-base sm:text-lg text-[#F2F5FA] hover:text-[#2D6BFF] transition-colors"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            jabbir.dev
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-xs sm:text-sm text-[#A6AFBF] hover:text-[#F2F5FA] transition-colors link-underline"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('cta')}
              className="btn-primary text-xs sm:text-sm"
            >
              Start a project
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[#F2F5FA]"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[99] bg-[#07080B]/95 backdrop-blur-xl transition-all duration-500 md:hidden ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 sm:gap-8">
          {navLinks.map((link, index) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-xl sm:text-2xl font-semibold text-[#F2F5FA] hover:text-[#2D6BFF] transition-colors"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                animationDelay: `${index * 0.1}s`
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('cta')}
            className="btn-primary text-base sm:text-lg mt-4"
          >
            Start a project
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;

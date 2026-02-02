import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TechnicalNotesSectionProps {
  className?: string;
}

const TechnicalNotesSection = ({ className = '' }: TechnicalNotesSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Cards animation
      const cards = gridRef.current?.querySelectorAll('.note-card');
      if (cards) {
        gsap.fromTo(cards,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const filters = ['All', 'AI', 'LLM', 'Embedded', 'Product'];

  const notes = [
    {
      title: 'LangGraph Multi-Agent Systems for Mesh Networks',
      excerpt: 'Building autonomous LLM agents with LangGraph and CrewAI for self-healing mesh networks. State machines, shared context, and event-driven recovery patterns.',
      image: '/note_llm_agents.jpg',
      readTime: '8 min',
      date: 'Jan 2025',
      category: 'AI'
    },
    {
      title: 'OpenWRT/LEDE Custom Kernel Modules for RF Analysis',
      excerpt: 'Developing custom kernel modules for RF spectrum monitoring in contested environments. BATMAN-ADV modifications, OLSR tuning, and packet injection techniques.',
      image: '/note_mesh_gps.jpg',
      readTime: '10 min',
      date: 'Dec 2024',
      category: 'Embedded'
    },
    {
      title: 'LLM-as-Judge for AI System Validation',
      excerpt: 'Using GPT-4 and Claude for automated testing of LLM outputs. RAGAS framework, hallucination detection, and consistency metrics for production AI.',
      image: '/note_ai_validation.jpg',
      readTime: '7 min',
      date: 'Nov 2024',
      category: 'AI'
    },
    {
      title: 'Android ATAK Plugin Development with CoT Protocol',
      excerpt: 'Building ATAK plugins for blue force tracking and mesh control. CoT message parsing, XML schema, and MARTI API integration for tactical comms.',
      image: '/note_embedded_ui.jpg',
      readTime: '6 min',
      date: 'Oct 2024',
      category: 'Product'
    },
    {
      title: 'Hybrid RAG: Dense + Sparse Retrieval with Re-ranking',
      excerpt: 'Production RAG pipeline combining semantic search with BM25. Cross-Encoder re-ranking, query expansion, and metadata filtering for 100K+ documents.',
      image: '/note_rag.jpg',
      readTime: '8 min',
      date: 'Sep 2024',
      category: 'LLM'
    },
    {
      title: 'Generative AI for RF Test Case Generation',
      excerpt: 'Using LLM agents to generate comprehensive test cases for mesh radio testing. Coverage analysis, edge case discovery, and automated validation pipeline.',
      image: '/note_radio_testing.jpg',
      readTime: '7 min',
      date: 'Aug 2024',
      category: 'Embedded'
    }
  ];

  const filteredNotes = activeFilter === 'All' 
    ? notes 
    : notes.filter(note => note.category === activeFilter);

  return (
    <section 
      ref={sectionRef}
      id="technical-notes"
      className={`section-flowing bg-[#07080B] py-20 lg:py-32 ${className}`}
    >
      <div className="px-6 lg:px-[6vw]">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          <h2 
            className="text-[clamp(32px,4vw,56px)] font-bold text-[#F2F5FA]"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Technical notes
          </h2>
          
          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === filter
                    ? 'bg-[#2D6BFF] text-[#07080B]'
                    : 'bg-[#0E111A] text-[#A6AFBF] hover:bg-[#0E111A]/80 border border-white/5'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredNotes.map((note, index) => (
            <article
              key={index}
              className="note-card group cursor-pointer"
            >
              <div className="premium-card relative rounded-xl overflow-hidden bg-[#0E111A] border border-white/5 hover:border-[#2D6BFF]/30">
                {/* Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img 
                    src={note.image}
                    alt={note.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E111A] to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Meta */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="meta-label text-[10px]">{note.date}</span>
                    <span className="w-1 h-1 rounded-full bg-[#A6AFBF]" />
                    <span className="flex items-center gap-1 text-[#A6AFBF] text-xs">
                      <Clock size={12} />
                      {note.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-[#F2F5FA] mb-2 group-hover:text-[#2D6BFF] transition-colors line-clamp-2">
                    {note.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-[#A6AFBF] line-clamp-2 mb-4">
                    {note.excerpt}
                  </p>

                  {/* Link */}
                  <div className="flex items-center gap-1 text-[#2D6BFF] text-sm font-medium">
                    Read article
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalNotesSection;

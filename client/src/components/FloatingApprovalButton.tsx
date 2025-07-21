import { useState, useEffect } from 'react';
import { CheckCircle, MessageSquare } from 'lucide-react';

interface FloatingApprovalButtonProps {
  text: string;
  color: string;
  language: string;
  show: boolean;
}

export function FloatingApprovalButton({ text, color, language, show }: FloatingApprovalButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!show) {
      setIsVisible(false);
      return;
    }

    const handleScroll = () => {
      // Show button when user scrolls past the hero section
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [show]);

  const scrollToApproval = () => {
    const approvalSection = document.getElementById('client-approval');
    if (approvalSection) {
      approvalSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  if (!show || !isVisible) return null;

  return (
    <button
      onClick={scrollToApproval}
      className="floating-approval-btn"
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        backgroundColor: color,
        color: 'white',
        border: 'none',
        borderRadius: '25px',
        padding: '12px 20px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        zIndex: 1000,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        animation: 'fadeInUp 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      }}
    >
      <CheckCircle size={16} />
      {text || (language === 'es' ? 'Aprobar Sitio' : 'Approve Website')}
    </button>
  );
}

// Add CSS animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);
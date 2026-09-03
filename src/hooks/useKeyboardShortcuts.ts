import { useEffect } from 'react';

interface KeyboardShortcutsOptions {
  onPlayPause: () => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  onRestart: () => void;
  enabled?: boolean;
}

export function useKeyboardShortcuts({
  onPlayPause,
  onNextStep,
  onPrevStep,
  onRestart,
  enabled = true,
}: KeyboardShortcutsOptions) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input element
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
        return;
      }

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          onPlayPause();
          break;
        case 'ArrowRight':
          e.preventDefault();
          onNextStep();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          onPrevStep();
          break;
        case 'KeyR':
          e.preventDefault();
          onRestart();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onPlayPause, onNextStep, onPrevStep, onRestart, enabled]);
}

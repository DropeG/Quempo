'use client';

import { useState, useEffect, useCallback } from 'react';
import { User } from '@supabase/supabase-js';

const STORAGE_KEY = 'faredeo_onboarding_completed_v1';

export function useOnboardingTour(user: User | null) {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [isTourActive, setIsTourActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Check on user login if user has completed onboarding before
  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => {
        setShowWelcomeModal(false);
        setIsTourActive(false);
      }, 0);
      return () => clearTimeout(timer);
    }

    try {
      const localCompleted = localStorage.getItem(`${STORAGE_KEY}_${user.id}`);
      const metadataCompleted = user.user_metadata?.has_seen_onboarding;

      if (!localCompleted && !metadataCompleted) {
        // Show welcome prompt for first-time login
        const timer = setTimeout(() => {
          setShowWelcomeModal(true);
        }, 800);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.error('Error reading onboarding state:', e);
    }
  }, [user]);

  const completeOnboardingState = useCallback(() => {
    if (user?.id) {
      try {
        localStorage.setItem(`${STORAGE_KEY}_${user.id}`, 'true');
      } catch (e) {
        console.error('Error saving onboarding state:', e);
      }
    }
  }, [user]);

  const startTour = useCallback(() => {
    setShowWelcomeModal(false);
    setCurrentStep(0);
    setIsTourActive(true);
  }, []);

  const skipTour = useCallback(() => {
    setShowWelcomeModal(false);
    setIsTourActive(false);
    completeOnboardingState();
  }, [completeOnboardingState]);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => prev + 1);
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  }, []);

  const finishTour = useCallback(() => {
    setIsTourActive(false);
    setIsCompleted(true);
    completeOnboardingState();
  }, [completeOnboardingState]);

  const restartTour = useCallback(() => {
    setShowWelcomeModal(false);
    setIsCompleted(false);
    setCurrentStep(0);
    setIsTourActive(true);
  }, []);

  const closeCompletionModal = useCallback(() => {
    setIsCompleted(false);
  }, []);

  return {
    showWelcomeModal,
    isTourActive,
    currentStep,
    isCompleted,
    startTour,
    skipTour,
    nextStep,
    prevStep,
    finishTour,
    restartTour,
    closeCompletionModal,
  };
}

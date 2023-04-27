import { create } from 'zustand';
import { persist } from 'zustand/middleware';


/// Settings Store

interface SettingsStore {

  // UI settings

  preferredLanguage: string;
  setPreferredLanguage: (preferredLanguage: string) => void;

  centerMode: 'narrow' | 'wide' | 'full';
  setCenterMode: (centerMode: 'narrow' | 'wide' | 'full') => void;

  renderMarkdown: boolean;
  setRenderMarkdown: (renderMarkdown: boolean) => void;

  showPurposeFinder: boolean;
  setShowPurposeFinder: (showPurposeFinder: boolean) => void;

  showSystemMessages: boolean;
  setShowSystemMessages: (showSystemMessages: boolean) => void;

  zenMode: 'clean' | 'cleaner';
  setZenMode: (zenMode: 'clean' | 'cleaner') => void;

  // OpenAI API settings

  apiKey: string;
  setApiKey: (apiKey: string) => void;

  apiHost: string;
  setApiHost: (apiHost: string) => void;

  apiOrganizationId: string;
  setApiOrganizationId: (apiOrganizationId: string) => void;

  modelTemperature: number;
  setModelTemperature: (modelTemperature: number) => void;

  modelMaxResponseTokens: number;
  setModelMaxResponseTokens: (modelMaxResponseTokens: number) => void;

  // ElevenLabs Text to Speech settings

  elevenLabsApiKey: string;
  setElevenLabsApiKey: (apiKey: string) => void;

  elevenLabsVoiceId: string;
  setElevenLabsVoiceId: (voiceId: string) => void;

  elevenLabsAutoSpeak: 'off' | 'firstLine';
  setElevenLabsAutoSpeak: (autoSpeak: 'off' | 'firstLine') => void;

  // Prodia Image Generation settings

  prodiaApiKey: string;
  setProdiaApiKey: (apiKey: string) => void;

  prodiaModelId: string;
  setProdiaModelId: (modelId: string) => void;

  prodiaNegativePrompt: string;
  setProdiaNegativePrompt: (negativePrompt: string) => void;

  prodiaSteps: number;
  setProdiaSteps: (steps: number) => void;

  prodiaCfgScale: number;
  setProdiaCfgScale: (cfgScale: number) => void;

  prodiaSeed: number | null;
  setProdiaSeed: (seed: string) => void;

  // Google Custom Search settings
  googleApiKey: string;
  setGoogleApiKey: (googleApiKey: string) => void;

  cseId: string;
  setCseId: (cseId: string) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({

      // UI settings

      preferredLanguage: (typeof navigator !== 'undefined') && navigator.language || 'en-US',
      setPreferredLanguage: (preferredLanguage: string) => set({ preferredLanguage }),

      centerMode: 'wide',
      setCenterMode: (centerMode: 'narrow' | 'wide' | 'full') => set({ centerMode }),

      renderMarkdown: false,
      setRenderMarkdown: (renderMarkdown: boolean) => set({ renderMarkdown }),

      showPurposeFinder: false,
      setShowPurposeFinder: (showPurposeFinder: boolean) => set({ showPurposeFinder }),

      showSystemMessages: false,
      setShowSystemMessages: (showSystemMessages: boolean) => set({ showSystemMessages }),

      zenMode: 'clean',
      setZenMode: (zenMode: 'clean' | 'cleaner') => set({ zenMode }),

      // OpenAI API settings

      apiKey: (function() {
        // this will be removed in April
        if (typeof localStorage === 'undefined') return '';
        return localStorage.getItem('app-settings-openai-api-key') || '';
      })(),
      setApiKey: (apiKey: string) => set({ apiKey }),

      apiHost: '',
      setApiHost: (apiHost: string) => set({ apiHost }),

      apiOrganizationId: '',
      setApiOrganizationId: (apiOrganizationId: string) => set({ apiOrganizationId }),

      modelTemperature: 0.5,
      setModelTemperature: (modelTemperature: number) => set({ modelTemperature }),

      modelMaxResponseTokens: 1024,
      setModelMaxResponseTokens: (modelMaxResponseTokens: number) => set({ modelMaxResponseTokens: modelMaxResponseTokens }),

      // ElevenLabs Text to Speech settings

      elevenLabsApiKey: '',
      setElevenLabsApiKey: (elevenLabsApiKey: string) => set({ elevenLabsApiKey }),

      elevenLabsVoiceId: '',
      setElevenLabsVoiceId: (elevenLabsVoiceId: string) => set({ elevenLabsVoiceId }),

      elevenLabsAutoSpeak: 'firstLine',
      setElevenLabsAutoSpeak: (elevenLabsAutoSpeak: 'off' | 'firstLine') => set({ elevenLabsAutoSpeak }),

      // Prodia Image Generation settings

      prodiaApiKey: '',
      setProdiaApiKey: (prodiaApiKey: string) => set({ prodiaApiKey }),

      prodiaModelId: '',
      setProdiaModelId: (prodiaModelId: string) => set({ prodiaModelId }),

      prodiaNegativePrompt: '',
      setProdiaNegativePrompt: (prodiaNegativePrompt: string) => set({ prodiaNegativePrompt }),

      prodiaSteps: 25,
      setProdiaSteps: (prodiaSteps: number) => set({ prodiaSteps }),

      prodiaCfgScale: 7,
      setProdiaCfgScale: (prodiaCfgScale: number) => set({ prodiaCfgScale }),

      prodiaSeed: null,
      setProdiaSeed: (prodiaSeed: string) => set({ prodiaSeed: (prodiaSeed === '' || prodiaSeed === '-1') ? null : parseInt(prodiaSeed) ?? null }),

      // Google Custom Search settings
      googleApiKey: '',
      setGoogleApiKey: (googleApiKey: string) => set({ googleApiKey }),

      cseId: '',
      setCseId: (cseId: string) => set({ cseId }),
    }),
    {
      name: 'app-settings',
    }),
);

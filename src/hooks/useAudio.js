import { useEffect, useCallback } from 'react';
import { useGameStore } from '../store/useGameStore';

// Global singletons for BGM
let globalBGM = null;

export const useAudio = () => {
    const { audioSettings } = useGameStore();

    // Singleton initializer for BGM with persistence across hook calls
    if (typeof window !== 'undefined' && !globalBGM) {
        globalBGM = new Audio();
        globalBGM.loop = true;
    }

    // changeBGM logic: Only changes if URL is different
    const changeBGM = useCallback((url) => {
        if (!globalBGM) return;

        // If no URL, stop the music
        if (!url) {
            globalBGM.pause();
            globalBGM.src = "";
            return;
        }

        // Only change and play if the track is actually different
        if (globalBGM.src !== url) {
            globalBGM.pause();
            globalBGM.src = url;
            globalBGM.currentTime = 0; // Reset to start

            if (!audioSettings.isMuted) {
                // Ensure audio is ready before playing (helps with race conditions in React)
                globalBGM.load();
                globalBGM.play().catch(e => {
                    console.warn("BGM Playback deferred until user interaction:", e.name);
                });
            }
        } else if (!audioSettings.isMuted && globalBGM.paused) {
            // If already set but paused (e.g. after mute/unmute), resume
            globalBGM.play().catch(() => { });
        }
    }, [audioSettings.isMuted]);

    // Volume and Mute maintenance
    useEffect(() => {
        if (globalBGM) {
            globalBGM.volume = audioSettings.bgmVolume || 0.4;
            if (audioSettings.isMuted) {
                globalBGM.pause();
            } else if (globalBGM.src && globalBGM.paused) {
                globalBGM.play().catch(() => { });
            }
        }
    }, [audioSettings.isMuted, audioSettings.bgmVolume]);

    // Enhanced SFX Logic with more reliable URLs and error handling
    const playSFX = useCallback((type) => {
        const sfxUrls = {
            click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
            transition: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
            success: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
            fail: 'https://assets.mixkit.co/active_storage/sfx/2600/2600-preview.mp3' // Updated from dead link
        };

        const url = sfxUrls[type];
        if (url) {
            const sfx = new Audio(url);
            sfx.volume = audioSettings.sfxVolume || 0.7;

            if (!audioSettings.isMuted) {
                // Return promise and handle silently
                sfx.play().catch(e => {
                    console.warn(`SFX Type: ${type} - Playback blocked or failed. Browser policy requires user interaction first.`, e.name);
                });
            }
        }
    }, [audioSettings.isMuted, audioSettings.sfxVolume]);

    return { playSFX, changeBGM };
};

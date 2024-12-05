import React, { useState, useEffect } from "react";
import { Search, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation';

const searchPhrases = [
    "Top 10 bars in Budapest",
    "Hiking trips in Nepal",
    "Best clubs in Berlin",
    "Where to get local food",
    "Car rental in Rome"
];

const TypingEffect = () => {
    const [displayedText, setDisplayedText] = useState("");
    const [isVisible, setIsVisible] = useState(true);

    const router = useRouter();

    
    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible((prev) => !prev);
        }, 500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let currentPhraseIndex = 0;
        let currentCharIndex = 0;
        let isTyping = true;

        const typeText = () => {
            setTimeout(
                () => {
                    if (isTyping) {
                        const currentPhrase = searchPhrases[currentPhraseIndex];
                        setDisplayedText(currentPhrase.substring(0, currentCharIndex + 1));
                        currentCharIndex++;
                       
                        if (currentCharIndex === currentPhrase.length) {
                            isTyping = false;
                            setTimeout(typeText, 1000);
                        } else {
                            setTimeout(typeText, 100);
                        }
                    } else {
                        setDisplayedText((prev) => prev.slice(0, -1));
                        currentCharIndex--;
                       
                        if (currentCharIndex === 0) {
                            isTyping = true;
                            currentPhraseIndex = (currentPhraseIndex + 1) % searchPhrases.length;
                            setTimeout(typeText, 500);
                        } else {
                            setTimeout(typeText, 75);
                        }
                    }
                },
                isTyping ? 100 : 75
            );
        };

        typeText();
        
        return () => {
            // Cleanup to prevent memory leaks
            clearTimeout(typeText);
        };
    }, []);

    const handleClick = () => {
        window.open('/login', '_blank');
      };
  

    return (
        <div className="relative w-full max-w-2xl mx-auto mt-6 cursor-pointer"  onClick={handleClick}>
            <div className="absolute -top-2 -right-2 z-0">
                <Sparkles
                    className="text-pink-400 opacity-50 animate-pulse"
                    size={24}
                />
            </div>
            <div className="
                flex items-center 
                bg-white 
                dark:bg-slate-800 
                rounded-full 
                shadow-lg
                hover:shadow-xl 
                transition-all 
                duration-300
                px-4 sm:px-6 
                py-3 sm:py-4
                space-x-3 sm:space-x-6
                relative 
                z-10
            ">
                <Search
                    className="text-gray-500 size-6 sm:size-8"
                />
                <p className="text-lg sm:text-xl text-gray-800 dark:text-white flex items-center">
                    <span className="mr-1">Explore</span>
                    <span className="text-teal-500 font-semibold">
                        {displayedText}
                        <span className="text-gray-400 dark:text-gray-600 ml-1">
                            {isVisible ? "|" : ""}
                        </span>
                    </span>
                </p>
            </div>
        </div>
    );
};

export default TypingEffect;
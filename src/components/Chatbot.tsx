'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, ChevronRight, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface Message {
    id: string;
    type: 'bot' | 'user';
    text: string;
    options?: Option[];
}

interface Option {
    label: string;
    action: string;
    payload?: string;
}

export default function Chatbot() {
    // We can add translations later, hardcoding for speed/demo first
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            type: 'bot',
            text: 'Hello! 👋 Welcome to Bright Support. How can we assist you today?',
            options: [
                { label: 'View Services', action: 'services' },
                { label: 'Contact Us', action: 'contact' },
                { label: 'NDIS Question', action: 'ndis' },
            ]
        }
    ]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleOptionClick = (option: Option) => {
        // Add user message
        const userMsg: Message = {
            id: Date.now().toString(),
            type: 'user',
            text: option.label
        };
        setMessages(prev => [...prev, userMsg]);

        // Simulate typing delay
        setTimeout(() => {
            let botMsg: Message;

            switch (option.action) {
                case 'services':
                    botMsg = {
                        id: (Date.now() + 1).toString(),
                        type: 'bot',
                        text: 'We offer a wide range of disability and support services. Any specific area?',
                        options: [
                            { label: 'Community Nursing', action: 'link', payload: '/services/community-nursing-complex-care' },
                            { label: 'Companionship', action: 'link', payload: '/services/companionship' },
                            { label: 'See All Services', action: 'link', payload: '/our-services' }
                        ]
                    };
                    break;
                case 'contact':
                    botMsg = {
                        id: (Date.now() + 1).toString(),
                        type: 'bot',
                        text: 'You can reach us at 1800 407 508 or email care@brightsupport.com.au. Would you like to open our contact form?',
                        options: [
                            { label: 'Go to Contact Page', action: 'link', payload: '/contact-us' },
                            { label: 'Back to Menu', action: 'menu' }
                        ]
                    };
                    break;
                case 'ndis':
                    botMsg = {
                        id: (Date.now() + 1).toString(),
                        type: 'bot',
                        text: 'Yes, we are a registered NDIS provider! We can help with Core Supports, Capacity Building, and more.',
                        options: [
                            { label: 'View NDIS Guide', action: 'link', payload: '/landing/ndis-support' },
                            { label: 'Back to Menu', action: 'menu' }
                        ]
                    };
                    break;
                case 'menu':
                    botMsg = {
                        id: (Date.now() + 1).toString(),
                        type: 'bot',
                        text: 'What else can I help you with?',
                        options: [
                            { label: 'View Services', action: 'services' },
                            { label: 'Contact Us', action: 'contact' },
                            { label: 'NDIS Question', action: 'ndis' },
                        ]
                    };
                    break;
                case 'link':
                    botMsg = {
                        id: (Date.now() + 1).toString(),
                        type: 'bot',
                        text: 'Navigating you there now...',
                        options: []
                    };
                    if (option.payload) {
                        window.location.href = option.payload; // Simple nav
                    }
                    break;
                default:
                    botMsg = {
                        id: (Date.now() + 1).toString(),
                        type: 'bot',
                        text: 'I am not sure about that. Please contact our support team.',
                        options: [{ label: 'Contact Us', action: 'contact' }]
                    };
            }

            setMessages(prev => [...prev, botMsg]);
        }, 600);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 bg-white w-80 md:w-96 rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col pointer-events-auto transform transition-all duration-300 origin-bottom-right animate-in fade-in slide-in-from-bottom-10">
                    {/* Header */}
                    <div className="bg-navy-900 p-4 flex items-center justify-between text-white">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 bg-coral-500 rounded-full flex items-center justify-center">
                                    <MessageCircle className="w-6 h-6 text-white" />
                                </div>
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-navy-900 rounded-full"></span>
                            </div>
                            <div>
                                <h3 className="font-bold">Bright Assistant</h3>
                                <p className="text-navy-200 text-xs">Online & Ready to Help</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-navy-200 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 p-4 h-96 overflow-y-auto bg-gray-50/50 space-y-4">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${msg.type === 'user'
                                            ? 'bg-navy-900 text-white rounded-br-none'
                                            : 'bg-white text-gray-700 rounded-bl-none border border-gray-100'
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {/* Options Buttons (Only for the last bot message) */}
                        {messages[messages.length - 1].type === 'bot' && messages[messages.length - 1].options && (
                            <div className="flex flex-col gap-2 mt-2 ml-2">
                                {messages[messages.length - 1].options?.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleOptionClick(option)}
                                        className="text-left px-4 py-2 bg-white border border-coral-200 text-coral-600 rounded-xl text-sm font-medium hover:bg-coral-50 hover:border-coral-300 transition-colors flex items-center justify-between group shadow-sm"
                                    >
                                        {option.label}
                                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </button>
                                ))}
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Footer/Input (Not functional for rule-based, just decor) */}
                    <div className="p-3 bg-white border-t border-gray-100 text-center text-xs text-gray-400">
                        Powered by Bright Support
                    </div>
                </div>
            )}

            {/* Floating Action Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 pointer-events-auto hover:scale-105 active:scale-95 ${isOpen ? 'bg-navy-800 rotate-90' : 'bg-coral-500 hover:bg-coral-600'
                    }`}
            >
                {isOpen ? (
                    <X className="w-6 h-6 text-white" />
                ) : (
                    <MessageCircle className="w-7 h-7 text-white" />
                )}
            </button>
        </div>
    );
}

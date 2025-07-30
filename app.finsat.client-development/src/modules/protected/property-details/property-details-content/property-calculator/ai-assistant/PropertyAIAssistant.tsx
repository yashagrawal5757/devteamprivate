import React, { useEffect } from 'react'
import usePropertyAIAssistant, { PropertyAIAssistantMessageType } from './hooks/usePropertyAIAssistant';
import ReactMarkdown from 'react-markdown';
import { FiArrowUp } from 'react-icons/fi';

const PropertyAIAssistant = () => {
    const {
        messagesEndRef,
        messages,
        loading,
        prompt,
        setPrompt,
        sendPrompt
    } = usePropertyAIAssistant();

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="w-full h-full bg-white rounded-xl shadow-lg flex flex-col h-fullborder border-gray-200">
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t-xl flex items-center gap-2">
                <span className="inline-block w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg">
                    <img
                        src="/ava-chatbot.png"
                        alt="AVA"
                        className="w-8 h-8 object-contain"
                    />
                </span>
                <span className="font-semibold text-gray-800">AVA AI Assistant</span>
            </div>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 bg-gray-50">
                {messages.map((message, idx) => (
                    <div
                        key={idx}
                        className={
                            message.type === PropertyAIAssistantMessageType.PROMPT
                                ? 'flex justify-end'
                                : 'flex justify-start'
                        }
                    >
                        <div
                            className={
                                message.type === PropertyAIAssistantMessageType.PROMPT
                                    ? 'bg-blue-500 text-white rounded-lg px-4 py-2 max-w-xs shadow text-sm'
                                    : 'bg-gray-200 text-gray-800 rounded-lg px-4 py-2 max-w-xs shadow text-sm'
                            }
                        >
                            <ReactMarkdown>{message.text}</ReactMarkdown>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-200 text-gray-400 rounded-lg px-4 py-2 max-w-xs shadow animate-pulse">
                            Thinking...
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            {/* Input */}
            <form
                onSubmit={sendPrompt}
                className="px-4 py-3 border-t border-gray-200 bg-white rounded-b-xl flex gap-2"
            >
                <input
                    type="text"
                    className={`flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm ${loading ? ' disabled:opacity-50' : ''}`}
                    placeholder="Ask about this property..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={loading}
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition disabled:opacity-50 text-sm"
                    disabled={loading || !prompt.trim()}
                >
                    <FiArrowUp />
                </button>
            </form>
            <div className="w-full px-4 pb-2 mt-1 text-center">
                <span className="block text-xs sm:text-sm text-gray-500 break-words">
                    By messaging AVA, you agree to our <a href='/ava/terms-and-conditions' className='text-primary underline' target='_blank' rel='noopener noreferrer'>&nbsp;Terms&nbsp;</a> and have read our <a href='/ava/privacy-policy' className='text-primary underline' target='_blank' rel='noopener noreferrer'>&nbsp;Privacy Policy&nbsp;</a>.
                </span>
            </div>
        </div>
    )
}

export default PropertyAIAssistant
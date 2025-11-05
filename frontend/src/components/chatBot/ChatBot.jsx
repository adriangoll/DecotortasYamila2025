import { useState, useRef, useEffect } from 'react';
import { FaComments, FaTimes, FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';

// Componente del ícono del bot
const ChatbotIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 1024 1024">
      <path fill="#f06292" d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5z" />
    </svg>
  );
};

// Componente de mensaje individual
const ChatMessage = ({ message }) => {
  return (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      {message.sender === 'bot' && (
        <div className="mr-2 flex-shrink-0">
          <ChatbotIcon />
        </div>
      )}
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-3 ${
          message.sender === 'user'
            ? 'bg-pink-500 text-white rounded-br-none'
            : message.isError
            ? 'bg-red-100 text-red-800 rounded-bl-none border border-red-300'
            : 'bg-white text-gray-800 rounded-bl-none shadow'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
        <span className={`text-xs mt-1 block ${
          message.sender === 'user' ? 'text-pink-100' : 'text-gray-400'
        }`}>
          {message.timestamp.toLocaleTimeString('es-AR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>
    </div>
  );
};

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      text: '¡Hola! 👋 Soy tu asistente virtual de Decotortas Yamila. ¿En qué puedo ayudarte hoy?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const generateBotResponse = async (userMessage) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/chat',
        {
          message: userMessage,
          userId: 'guest-user',
          context: {}
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      // Remover el mensaje "Pensando..."
      setChatHistory((prev) => prev.filter((msg) => msg.text !== 'Pensando...'));

      // Agregar la respuesta del bot
      const botMessage = {
        id: Date.now(),
        text:
          response.data.message ||
          response.data.response ||
          'Lo siento, solo respondo preguntas relacionadas con nuestros productos y servicios. ¿Quieres que te ayude con precios, envíos o pedidos?',
        sender: 'bot',
        timestamp: new Date(),
        isError: false
      };

      setChatHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error al generar respuesta:', error);

      // Remover "Pensando..."
      setChatHistory((prev) => prev.filter((msg) => msg.text !== 'Pensando...'));

      // Mensaje de error
      const errorMessage = {
        id: Date.now(),
        text: 'Lo siento, solo respondo preguntas relacionadas con nuestros productos y servicios. ¿Quieres que te ayude con precios, envíos o pedidos?',
        sender: 'bot',
        timestamp: new Date(),
        isError: true
      };

      setChatHistory((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const userMessage = inputRef.current.value.trim();
    if (!userMessage || isLoading) return;

    // Limpiar input
    inputRef.current.value = '';

    // Agregar mensaje del usuario
    const userMsg = {
      id: Date.now(),
      text: userMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setChatHistory((prev) => [...prev, userMsg]);
    setIsLoading(true);

    // Delay antes de mostrar "Pensando..."
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: 'Pensando...',
          sender: 'bot',
          timestamp: new Date()
        }
      ]);

      // Generar respuesta
      generateBotResponse(userMessage);
    }, 600);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Botón flotante */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 bg-pink-500 hover:bg-pink-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 z-50"
          aria-label="Abrir chat"
        >
          <FaComments className="text-2xl" />
        </button>
      )}

      {/* Ventana del chat */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <ChatbotIcon />
              </div>
              <div>
                <h3 className="font-semibold">Asistente Virtual</h3>
                <p className="text-xs opacity-90">Decotortas Yamila</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="hover:bg-pink-700 rounded-full p-2 transition"
              aria-label="Cerrar chat"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {chatHistory.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Formulario de entrada */}
          <form onSubmit={handleFormSubmit} className="p-4 bg-white border-t rounded-b-2xl">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-pink-500 hover:bg-pink-600 text-white rounded-full p-3 transition disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Enviar mensaje"
              >
                <FaPaperPlane />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default ChatBot;
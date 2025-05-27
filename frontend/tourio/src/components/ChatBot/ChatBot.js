import React, { useEffect } from 'react';

const ChatBot = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <df-messenger
        intent="WELCOME"
        chat-title="Tourio Assistant"
        agent-id="touriobot-ebqr"
        language-code="en"
      ></df-messenger>
    </>
  );
};

export default ChatBot;

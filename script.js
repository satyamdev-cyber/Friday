async function fridayReply(msg) {
    const API_KEY = "AIzaSyDgGZXX8rBM1VB9aKoLkHK5NXI_Psi9VL0";

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: `You are Friday, Satyam's best friend AI assistant. User: ${msg}`
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        const reply =
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Sorry, I couldn't generate a response.";

        addMessage("Friday: " + reply, "bot");
        speak(reply);

    } catch (error) {
        addMessage("Friday: Error connecting to Gemini.", "bot");
        console.error(error);
    }
}

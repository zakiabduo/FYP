import axios from "axios";

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.json({ success: false, message: "Message is required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.json({ success: false, message: "API Key is missing in .env file!" });
    }

    const promptText = `
      You are an AI Medical Assistant for a hospital booking system named "Doclo".
      Your job is to assist patients with general medical queries, symptom checking, and health advice.
      Rules:
      1. Be polite, professional, and caring.
      2. Keep your answers short and to the point.
      3. For any serious or specific medical conditions, ALWAYS advise the user to book an appointment with a specialist on the Doclo platform.
      4. Do not prescribe specific heavy medications, only suggest home remedies or over-the-counter basic medicine if perfectly safe.
      
      User's Query: ${message}
    `;

    let availableModelName = "gemini-1.5-flash"; // Default

    // 🚀 STEP 1: Dynamically fetch allowed models for YOUR specific API Key
    try {
      console.log("Fetching available models from Google...");
      const modelsResponse = await axios.get(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
      
      // Find the first model that supports generateContent
      const validModel = modelsResponse.data.models.find(m => 
        m.name.includes("gemini") && 
        m.supportedGenerationMethods.includes("generateContent")
      );

      if (validModel) {
        availableModelName = validModel.name.replace("models/", "");
        console.log(`✅ Dynamically selected model: ${availableModelName}`);
      } else {
        console.log("⚠️ No valid text generation model found in the list.");
      }
    } catch (fetchError) {
      const errorMsg = fetchError.response?.data?.error?.message || fetchError.message;
      console.error("❌ Failed to fetch model list. Your API Key might be invalid or restricted:", errorMsg);
      return res.json({ success: false, message: "API Key issue: " + errorMsg });
    }

    // 🚀 STEP 2: Use the dynamically selected model to get the chat response
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${availableModelName}:generateContent?key=${apiKey}`;

    const { data } = await axios.post(url, {
      contents: [{ parts: [{ text: promptText }] }]
    });

    const aiResponse = data.candidates[0].content.parts[0].text;
    res.json({ success: true, reply: aiResponse });

  } catch (error) {
    const exactError = error.response?.data?.error?.message || error.message;
    console.error("AI Chat Final Error:", exactError);
    res.json({ success: false, message: "AI Error: " + exactError });
  }
};

export { chatWithAI };
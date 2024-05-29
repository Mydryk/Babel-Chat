const { Translate } = require("@google-cloud/translate").v2;
const credentials = require("../credentials.json");

const translate = new Translate({
  credentials: credentials,
  projectId: credentials.project_id,
});

const translateMessage = async (text, targetLanguage, sourceLanguage) => {
  try {
    const [translation] = await translate.translate(text, {
      to: targetLanguage,
      from: sourceLanguage || "en", // Вихідна мова за замовчуванням - англійська
    });
    return translation;
  } catch (error) {
    console.error("Error translating message:", error);
    throw error;
  }
};

module.exports = { translate, translateMessage };

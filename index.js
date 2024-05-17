require("dotenv").config()
const axios = require("axios")
const fs = require("fs")

async function synthesizeSpeech() {
    const text = fs.readFileSync("text-input.txt", "utf8")

    const payload = {
        input: { text },
        voice: { languageCode: "cs", ssmlGender: "NEUTRAL" },
        audioConfig: { audioEncoding: "MP3" },
    }

    const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.GOOGLE_API_KEY}`

    try {
        const response = await axios.post(url, payload)
        const audioContent = response.data.audioContent

        // Decode base64 to binary data
        const audioBuffer = Buffer.from(audioContent, "base64")
        fs.writeFileSync("audio.mp3", audioBuffer, { encoding: "binary" })
        console.log("Audio content written to file: audio.mp3")
    } catch (error) {
        console.error("Error:", error)
    }
}

synthesizeSpeech()

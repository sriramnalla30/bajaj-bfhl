const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data;
    if (!Array.isArray(data)) {
      return res
        .status(400)
        .json({ is_success: false, message: "Input data must be an array." });
    }

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;
    let alpha_concat = [];

    data.forEach((item) => {
      if (/^\d+$/.test(item)) {
        // It's a number (as string)
        const num = parseInt(item, 10);
        if (num % 2 === 0) {
          even_numbers.push(item);
        } else {
          odd_numbers.push(item);
        }
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        // It's an alphabetic string
        alphabets.push(item.toUpperCase());
        alpha_concat.push(...item.split(""));
      } else {
        // Special character(s)
        special_characters.push(item);
      }
    });

    // Build concat_string: all alphabet chars, reverse, alternating caps
    let concat = alpha_concat.reverse().join("");
    let concatArr = concat.split("");
    let altCaps = concatArr
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    res.status(200).json({
      is_success: true,
      user_id: "nalla_sri_ram_29082025",
      email: "nalla.sriram2022@vitstudent.ac.in",
      roll_number: "22BCT0310",
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string: altCaps,
    });
  } catch (err) {
    res.status(500).json({ is_success: false, message: "Server error." });
  }
});

// Export the app for Vercel serverless deployment
module.exports = app;

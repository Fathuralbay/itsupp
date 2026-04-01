const db = require("./db")

exports.register = (req, res) => {
  const { username, email, password } = req.body

  const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)"
  
  db.query(sql, [username, email, password], (err, result) => {
    if (err) return res.json({ message: "Error", err })
    res.json({ message: "Register berhasil" })
  })
}

exports.login = (req, res) => {
  const { email, password } = req.body

  const sql = "SELECT * FROM users WHERE email=? AND password=?"

  db.query(sql, [email, password], (err, result) => {
    if (err) return res.json({ message: "Error", err })

    if (result.length > 0) {
      res.json({ message: "Login berhasil", user: result[0] })
    } else {
      res.json({ message: "Email atau password salah" })
    }
  })
}

exports.profile = (req, res) => {
  const { email } = req.query

  const sql = "SELECT username, email FROM users WHERE email=?"

  db.query(sql, [email], (err, result) => {
    if (err) return res.json({ message: "Error", err })

    if (result.length > 0) {
      res.json(result[0])
    } else {
      res.json({ message: "User tidak ditemukan" })
    }
  })
}
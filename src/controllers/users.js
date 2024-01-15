const { User } = require('../db/associations').models;
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const ENTITY = "User"

const signup = async (req, res) => {
    const { username, password, email } = req.body;
  
    try {
      const alreadyFoundUser = await User.findOne({
        where: { username }
      })
      if (alreadyFoundUser) {
        return res.status(409).json({ message: 'Conflict: User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = { username, email, password: hashedPassword };
      let [registeredUser, wasRegistered] = await User.findOrCreate({
        where: newUser
      })
      if (!wasRegistered) {
        return res.status(301).json("Already registered!");
      }

      return res.status(201).json({
        message: 'User registered successfully',
        user: registeredUser
      });
    } catch (error) {
      console.error(error);
      res.status(400).send(`${ENTITY} signup POST error!`)
    }
  
}

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find user by username
    const foundUser = await User.findOne({
      where: { username }
    })
  
    if (!foundUser) {
      return res.status(404).json({error: "Username not found."})
    } 
    if (await bcrypt.compare(password, foundUser.password)) {
      const token = jwt.sign({ username }, 'your-secret-key', { expiresIn: '1h' });
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ message: 'Unauthorized: Wrong password.' });
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(`${ENTITY} login POST error!`)
  }
}

module.exports = {
  signup,
  login
}

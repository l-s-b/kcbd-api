const mp = require('mercadopago');
require('dotenv').config();
const { MP_TOKEN, FRONTEND } = process.env;

mp.configure({ access_token: MP_TOKEN })

const postPreference = async (req, res) => {
  try {
    let preference = {
      items: [
          {
              title: req.body.detail,
              unit_price: Number(req.body.price),
              quantity: Number(req.body.qty) || 1
          }
      ],
      back_urls: {
          success: FRONTEND + '/compra-exitosa',
          failure: FRONTEND,
          pending: ''
      },
      auto_return: "approved"
    };

    const createdPref = await mp.preferences.create(preference);
    res.json({ id: createdPref.body.id })
  } catch (error) {
    console.error(error);
    res.status(400).send('Preference creation error!')
  }
}

module.exports = { postPreference };

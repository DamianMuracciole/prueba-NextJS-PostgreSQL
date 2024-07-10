import { NextResponse } from "next/server";
// SDK de Mercado Pago
import { MercadoPagoConfig , Preference } from "mercadopago";
// Agrega credenciales

export async function POST(req) {

  const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

  try {
    // obtengo los datos enviados
    const data = await req.json();
    const body = {
      items: [{
        title: String(data.title),
        unit_price: Number(data.price),
        quantity: Number(data.quantity),
        currency_id: 'ARS'
      }],
      back_urls: {
        success:'https://fullstackopen.com/es/',
        failure:'https://community.listopro.com/',
        pending:'https://www.cuevana2espanol.net/',
      },
      auto_return: 'approved',
    }
    const preference = new Preference(client);
    const result = await preference.create({body})
    console.log("data", data);

    //respuesta al front
    return NextResponse.json({id:result.id});
  } catch (error) {
    //muestra en consola del backend el error si no se conecta a DB
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

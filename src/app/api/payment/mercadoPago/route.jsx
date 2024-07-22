import { NextResponse } from "next/server";
// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from "mercadopago";
// Agrega credenciales

export async function POST(req) {
  const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN,
  });

  try {
    // obtengo los datos enviados
    const data = await req.json();
    const items = data.map((el) => {
      return {
        id: String(el.id),
        title: String(el.title),
        unit_price: Number(el.price),
        description: el.description,
        quantity: Number(el.quantity),
        currency_id: "ARS",
      };
    });
    const body = {
      items: items,
      // items: [
      //   {
      //     id: String(data[0].id),
      //     title: String(data[0].title),
      //     unit_price: Number(data[0].price),
      //     quantity: Number(data[0].quantity),
      //     currency_id: "ARS",
      //   },
      //   {
      //     id: String(data[1].id),
      //     title: String(data[1].title),
      //     unit_price: Number(data[1].price),
      //     quantity: Number(data[1].quantity),
      //     currency_id: "ARS",
      //   },
      // ],
      back_urls: {
        success: `${process.env.URL_TUNNEL}`+'/productos',
        failure: `${process.env.URL_TUNNEL}`,
        pending: `${process.env.URL_TUNNEL}`,
      },
      auto_return: "approved",
    };
    const preference = new Preference(client);
    const result = await preference.create({ body });
    // console.log("resultado de crear la preferencia ==> ", result);

    //respuesta al front
    return NextResponse.json({ id: result.id });
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

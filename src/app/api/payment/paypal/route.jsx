import paypal from "@paypal/checkout-server-sdk";
import next from "next";
import { NextResponse } from "next/server";

const ppClientId = process.env.NEXT_PUBLIC_PP_Client_ID;
const ppClienteSecret = process.env.PP_Client_Secret;

const environment = new paypal.core.SandboxEnvironment(
  ppClientId,
  ppClienteSecret
);
const client = new paypal.core.PayPalHttpClient(environment);

export async function POST(req) {
  try {
    const lista = await req.json();
    // console.log('el request de datas: ==> ',lista);
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: lista
    })

    const response = await client.execute(request);
    // console.log(response);
    return NextResponse.json({
      id: response.result.id
    })



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
import { NextResponse } from "next/server";

import { writeFile } from "fs/promises";
import path from "path"
import prisma from '@/libs/prisma';

export async function GET() {
  try {
    //Leo en la DB todos los productos
    const products = await prisma.products.findMany();
    return NextResponse.json({ data: products }, { status: 200 });
  } catch (error) {
    //muestra en consola del backend el error si no se conecta a DB
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    )
  }
}

export async function POST(request) {
  try {
    // guardo la data que vine del formulario
    const data = await request.formData();
    const image = data.get('urlImage');
    let urlImage = 0
    if (image === 'undefined')
      urlImage = '/images/defaultImage.png  ';
    else {
      const extension = image.name.split('.');
      const nombreImagen = new Date().getTime().toString() + '.' + extension[extension.length - 1];
      const imageData = await image.arrayBuffer();
      const imageDataBuffer = Buffer.from(imageData);
      const filePath = path.join(process.cwd(), 'public', 'images', nombreImagen);
      urlImage = path.join('/', 'images', nombreImagen);
      await writeFile(filePath, imageDataBuffer);
    }


    const dataToDB = {
      name: data.get('name'),
      description: data.get('description'),
      hiddendescription: data.get('hiddendescription')  === "true" ? true : false,
      price: Number(data.get('price')),
      hiddenprice: data.get('hiddenprice')  === "true" ? true : false,
      hiddenproduct: data.get('hiddenproduct')  === "true" ? true : false,
      urlImage: urlImage
    }

    //Copio en la DB
    const newProduct = await prisma.products.create(({
      data: dataToDB
    }));

    //Muestro por consola algunos valores
    return new NextResponse.json(JSON.stringify(newProduct));

  } catch (error) {
    //muestra en consola del backend el error si no se conecta a DB
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    )
  }
}
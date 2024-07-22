import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path"
import prisma from '@/libs/prisma';

export async function GET(request, { params }) {
  const id = parseInt(params.id);
  try {
    const product = await prisma.products.findFirst({
      where: { id: id },
    })

    if (!product) {
      return NextResponse.json(`Producto ${id} no encontrado`, { status: 404 })
    }
    return NextResponse.json(product);
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

export async function PUT(request, { params }) {
  const id = parseInt(params.id);
  try {
    // guardo la data que vine del formulario
    const data = await request.formData();
    //tratado de la imagen
    const image = data.get('urlImage');
    let urlImage = '';
    if (image.name != undefined) {
      const extension = image.name.split('.');
      const nombreImagen = new Date().getTime().toString() + '.' + extension[extension.length - 1];
      const imageData = await image.arrayBuffer();
      const imageDataBuffer = Buffer.from(imageData);
      const filePath = path.join(process.cwd(), 'public', 'images', 'products', nombreImagen);
      urlImage = path.join('/', 'images', 'products', nombreImagen);
      await writeFile(filePath, imageDataBuffer);
    } else {
      urlImage = image;
    }


    const dataToDB = {
      name: data.get('name'),
      description: data.get('description'),
      hiddendescription: data.get('hiddendescription') === "true" ? true : false,
      price: Number(data.get('price')),
      hiddenprice: data.get('hiddenprice') === "true" ? true : false,
      hiddenproduct: data.get('hiddenproduct') === "true" ? true : false,
      urlImage: urlImage
    }

    // console.log('dataToDB: ', dataToDB)
    //Copio en la DB
    const result = await prisma.products.update({
      where: { id: id },
      data: dataToDB,
    })
    // console.log('result: ', result)
    if (!result) {
      //si no consigo una respuesta de la DB
      return NextResponse.json(`Producto ${id} no encontrado`, { status: 404 })
    } else {
      //Muestro por consola algunos valores
      return NextResponse.json(JSON.stringify(result));
    }

  } catch (error) {
    //muestra en consola del backend el error si no se conecta a DB
    return new NextResponse.json(
      {
        message: "error.message,"
      },
      {
        status: 500,
      }
    )
  }

}

export async function DELETE(request, { params }) {
  const id = parseInt(params.id)
  try {
    const result = await prisma.products.delete({
      where: { id: id },
    })
    // console.log('Usuario borrado', result);
    return NextResponse.json({ nessage: result }, { status: 200 })
  } catch (error) {
    return new NextResponse.json(error.message, { status: 500 })
  }
}
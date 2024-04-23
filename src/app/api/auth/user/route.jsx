import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import bcrypt from 'bcrypt'
import path from "path"
import prisma from '@/libs/prisma';

export async function GET(request) {
  const session = await getServerSession(authOptions);
  //console.log(session.user)


  try {
    const user = await prisma.users.findFirst({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json(`Usuario no encontrado`, { status: 404 })
    }
    const userToResponse = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      company: user.company,
      avatar: user.avatar,
      newsletter: user.newsletter,
    }
    // console.log(userToResponse)
    return NextResponse.json(userToResponse);
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

export async function PUT(request) {

  // try {
  // guardo la data que viene del formulario
  const data = await request.formData();

  //tratado de la imagen
  const image = data.get('avatar');
  let avatar = '';
  if (image.name != undefined) {
    const extension = image.name.split('.');
    const nombreImagen = new Date().getTime().toString() + '.' + extension[extension.length - 1].toLowerCase();
    const imageData = await image.arrayBuffer();
    const imageDataBuffer = Buffer.from(imageData);
    const filePath = path.join(process.cwd(), 'public', 'images', 'products', nombreImagen);
    avatar = path.join('/', 'images', 'products', nombreImagen);
    await writeFile(filePath, imageDataBuffer);
  } else {
    avatar = image;
  }

  //tratado del password
  const userFound = await prisma.users.findUnique({
    where: {
      email: data.get('email')
    }
  })

  let password;

  if (data.get('password')) {
    const matchPassword = await bcrypt.compare(data.get('password'), userFound.password);
    if (!matchPassword) throw new Error('Contraseña no válida');

    //hasheo del password

    if (data.get('newPassword') && data.get('newPassword') !== '') {
      password = await bcrypt.hash(data.get('newPassword'), 10);
    } else {
      password = await bcrypt.hash(data.get('password'), 10);
    }
  } else {
    password = userFound.password;
  }

  const dataToDB = {
    firstname: data.get('firstname'),
    lastname: data.get('lastname'),
    username: data.get('username'),
    company: data.get('company'),
    newsletter: data.get('newsletter') === "true" ? true : false,
    password: password,
    avatar: avatar
  }

  // //Copio en la DB
  const result = await prisma.users.update({
    where: { email: data.get('email') },
    data: dataToDB,
  })
  if (!result) {
    //si no consigo una respuesta de la DB
    return NextResponse.json(`Usuario no encontrado`, { status: 404 })
  } else {
    //Muestro por consola algunos valores
    return NextResponse.json(JSON.stringify(result));
  }



  // } catch (error) {
  //   //muestra en consola del backend el error si no se conecta a DB
  //   return new NextResponse.json(
  //     {
  //       message: error.message,
  //     },
  //     {
  //       status: 500,
  //     }
  //   )
  // }

}

export async function DELETE(request, { params }) {
  const id = parseInt(params.id)
  try {
    const result = await prisma.products.delete({
      where: { id: id },
    })
    return NextResponse.json({ message: result }, { status: 200 })
  } catch (error) {
    return new NextResponse.json(error.message, { status: 500 })
  }
}
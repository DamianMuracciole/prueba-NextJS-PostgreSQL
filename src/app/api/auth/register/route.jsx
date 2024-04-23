import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path"
import prisma from '@/libs/prisma';
import bcrypt from 'bcrypt'; //Bcrypt devuelve un string de 48 carecteres según  

export async function POST(request) {
  try {
    // guardo la data que vine del formulario
    const data = await request.formData();
    const image = data.get('avatar');

    //tratado de la imagen
    let urlAvatar = 0
    if (image === 'undefined')
      urlAvatar = '/images/users/avatar.jpg  ';
    else {
      const extension = image.name.split('.');
      const nombreImagen = new Date().getTime().toString() + '.' + extension[extension.length - 1];

      const imageData = await image.arrayBuffer();
      const imageDataBuffer = Buffer.from(imageData);

      const filePath = path.join(process.cwd(), 'public', 'images', 'users', nombreImagen);
      urlAvatar = path.join('/', 'images', 'users', nombreImagen);
      await writeFile(filePath, imageDataBuffer);
    }
    
    //hasheo del password
    const password = await bcrypt.hash(data.get('password'),10);

    //Genero el objeto para la DB
    const dataToDB = {
      firstname: data.get('firstname'),
      lastname: data.get('lastname'),
      username: data.get('username'),
      email: data.get('email'),
      company: data.get('company'),
      password: password,
      newsletter: data.get('newsletter') === "true" ? true : false,
      avatar: urlAvatar
    }

    //Evalúo si se escuentra un email repetido
    const emailFound = await prisma.users.findUnique({
      where: {
        email: dataToDB.email
      }
    })
    if (emailFound) {
      return NextResponse.json(
        {
          message: 'El email ya está registrado'
        },
        {
          status: 400
        }
      )
    }


    //Copio en la DB
    const newUser = await prisma.users.create(({ data: dataToDB }));
    //Muestro por consola algunos valores
    const { password: _, ...newUserToConsole } = newUser
    return NextResponse.json(newUserToConsole);

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
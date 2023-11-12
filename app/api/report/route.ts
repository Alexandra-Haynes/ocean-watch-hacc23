import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export async function GET(req:any , res:any) {
  const events = await prisma.reportDebris.findMany();
  return Response.json(events)
}

export async function PATCH(req: Request) {
  const formData = await req.formData();
  const id = formData.get('id')?.toString();
  const status = formData.get('status')?.toString();
  const removalCompany = formData.get('removalCompany')?.toString();
  const result = prisma.reportDebris.update({
    where: { id: Number(id) },
    data: { status: status, removalCompany: removalCompany },
  });
  return Response.json((await result).id)
}

export async function POST(req: Request) {
  const formData = await req.formData()
  const address = formData.get('address')?.toString()
  const latitude = formData.get('latitude')?.toString()
  const longitude = formData.get('longitude')?.toString()
  const date = formData.get('date')?.toString()
  const debrisType = formData.get('debrisType')?.toString()
  const containerStatus = formData.get('containerStatus')?.toString()
  const biofouling = formData.get('biofouling')?.toString()
  const description = formData.get('description')?.toString()
  const island = formData.get('island')?.toString()
  const email = formData.get('email')?.toString()
  const phone = formData.get('phone')?.toString()
  const captcha = formData.get('captcha')?.toString()

  //TODO: Add images

  const result = prisma.reportDebris.create({
    data: {
      address: address,
      latitude: latitude,
      longitude: longitude,
      date: date,
      debrisType: debrisType,
      containerStatus: containerStatus,
      biofouling: biofouling,
      description: description,
      island: island,
      email: email,
      phone: phone,
      captcha: captcha,
  }});
  return Response.json((await result).id)
}
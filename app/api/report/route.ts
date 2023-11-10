import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export async function GET(req:any , res:any) {
  const events = await prisma.reportDebris.findMany();
  return Response.json(events)
}

export async function POST(req: Request) {
  const formData = await req.formData()
  const location = formData.get('location')?.toString()
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
      location: location,
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
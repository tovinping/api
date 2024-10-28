export default async function Page({ params }: { params: Promise<{ userId: string }> }) {
  const r = (await params).userId
  console.log(`server or client? ${r}`)
  return <div>your select user: {r}</div>
}
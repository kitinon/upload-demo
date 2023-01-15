/** @type {import('./$types').RequestHandler} */
import fs from 'fs'

const twoDec = num => (Math.round(num * 100) / 100).toFixed(2)
const KB = 1024, MB = 1024*KB, GB = 1024*MB
const formatSize = size => size > GB
  ? `${twoDec(size/GB)}GB`
  : size > MB
    ? `${twoDec(size/MB)}MB`
    : size > 1024
      ? `${twoDec(size/KB)}KB`
      : `${size} bytes`

export async function POST({ request, url }) {
  const { body } = request
  if (body == null) {
    console.error("body is null")
    return new Response("no data received.")
  }

  const name = url.searchParams.get('name')
  //const writer = fs.createWriteStream(`./${name}`, { encoding: "binary" })

  const reader = body.getReader()
  let totalSize = 0, i = 0
  let readResult = await reader.read()
  let startTime = performance.now(), lastTime
  while(!readResult.done) {
    const { value } = readResult
    // writer.write(value)
    totalSize += value.length
    ++i
    readResult = await reader.read()
    if (lastTime == null || performance.now()-lastTime > 250) {
      process.stdout.write(` ${formatSize(totalSize)} bytes received.\r`)
      lastTime = performance.now()
    }
  }
  //writer.end()
  const elaspedTime = (performance.now()-startTime)/1000
  const report = `Total size: ${formatSize(totalSize)} (${i} chunks) was received in ${twoDec(elaspedTime)} seconds (${formatSize(totalSize/elaspedTime)}/s).`
  console.log(report)
  /*
  fs.unlink(`./${name}`, err => {
    if (err) throw err
    console.log(`${name} was deleted.`)
  })
  */
 return new Response(report)
}
import cookieParser from 'cookie-parser'
import express, { Response, Request } from 'express'
import { join } from 'path'

const application = express()
const PORT = process.env.PORT || 3000

const TEMPLATE_PATH = join(__dirname, "public")
application.use(express.static(TEMPLATE_PATH))
application.use(cookieParser())

application.get("/", (request:Request, response:Response) => {
    response.sendFile(join(TEMPLATE_PATH, "index.html"))
})

application.get("/join/:room", (request: Request, response:Response):void => {
    const roomId = request.params.room
    response.cookie('roomId', roomId)
    response.send(roomId)
})

application.listen(PORT, () => {
    console.log("Check out port " + PORT)
})

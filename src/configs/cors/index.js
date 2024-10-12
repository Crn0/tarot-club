import 'dotenv/config'

const corsOptions = {
    origin: process.env.ACCESS_ORIGIN_URL.split(','),
    methods: 'GET,PUT,POST,PATCH,DELETE',
    credentials: true,
}

export default corsOptions
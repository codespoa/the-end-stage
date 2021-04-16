import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'

MongoHelper.connect(env.mongoUrl)

  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () =>
      console.log(`Server listening on http://localhost:${env.port}`)
    )
  })
  .catch((error) => {
    console.log('\x1b[31m', '[API] Error on connect DB', error)
  })

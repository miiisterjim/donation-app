import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions'

export async function message(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`)

  const name = request.query.get('name') || (await request.text()) || 'world'
  const body = { message: `Hello ${name}!` }
  return { jsonBody: body }
}

app.http('message', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: message,
})

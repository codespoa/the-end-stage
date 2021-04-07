import { HttpRequest, HttpResponse } from '@presentation/protocols/http'
import { MissingParamError } from '@presentation/error/missing-param-error'
import { badRequest } from '@presentation/helpers/http-helper'
import { Controller } from '@presentation/protocols/controller'
import { InvalidParamError } from '@presentation/error/invalid-param-error'
import { EmailValidator } from '@presentation/protocols/email-validator'
import { ServerError } from '@presentation/error/server-error'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requireFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ]
      for (const field of requireFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError(),
      }
    }
  }
}

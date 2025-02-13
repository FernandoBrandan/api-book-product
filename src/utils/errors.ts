/* eslint-disable space-before-function-paren */
export class ClientError extends Error {
  public statusCode: number
  constructor(message: string, status = 400) {
    super(message)
    this.statusCode = status
  }
}

export class MissingParamError extends Error {
  public statusCode: number

  constructor(paramName: string) {
    super(`Missing required parameter: ${paramName}`)
    this.name = 'MissingParamError'
    this.statusCode = 400
  }
}

export class ConnectionError extends Error {
  public statusCode: number
  constructor(message: string) {
    super(message)
    this.name = 'ConnectionError'
    this.statusCode = 500
  }
}

export class NotFoundError extends Error {
  public statusCode: number

  constructor(message: string = 'Resource not found') {
    super(message)
    this.name = 'NotFoundError'
    this.statusCode = 404
  }
}

export class UnauthorizedError extends Error {
  public statusCode: number

  constructor(message: string = 'Unauthorized access') {
    super(message)
    this.name = 'UnauthorizedError'
    this.statusCode = 401
  }
}

export class ForbiddenError extends Error {
  public statusCode: number

  constructor(message: string = 'Forbidden action') {
    super(message)
    this.name = 'ForbiddenError'
    this.statusCode = 403
  }
}

export class ServerError extends Error {
  public statusCode: number

  constructor(message: string = 'Internal server error') {
    super(message)
    this.name = 'ServerError'
    this.statusCode = 500
  }
}

export class TimeoutError extends Error {
  public statusCode: number

  constructor(message: string = 'Request timeout') {
    super(message)
    this.name = 'TimeoutError'
    this.statusCode = 408
  }
}

export class ConflictError extends Error {
  public statusCode: number

  constructor(message: string = 'Conflict detected') {
    super(message)
    this.name = 'ConflictError'
    this.statusCode = 409
  }
}

export class DependencyError extends Error {
  public statusCode: number

  constructor(message: string = 'Dependency failure') {
    super(message)
    this.name = 'DependencyError'
    this.statusCode = 424
  }
}

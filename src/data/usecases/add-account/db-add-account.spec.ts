import { DbAddAccount } from './db-add-account'
import { Encrypter } from '@data/protocols/encrypter'

interface SutTypes {
  sut: DbAddAccount
  encrypterStup: Encrypter
}

const makeSut = (): SutTypes => {
  class EncrypterStub {
    async encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve('hashed_password'))
    }
  }

  const encrypterStup = new EncrypterStub()
  const sut = new DbAddAccount(encrypterStup)
  return {
    sut,
    encrypterStup,
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { sut, encrypterStup } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStup, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})

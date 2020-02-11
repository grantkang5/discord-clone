type UserModel = import('../../entity/User').User

export {} 

declare global {
  namespace Express {
    interface User {
      id: number
    }
  }
}
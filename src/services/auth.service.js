import WakaspaceError from '@wakaspace/exception';
import { EthAddressService, UserService } from '@wakaspace/services';

export class AuthService {
  static async SignIn({ userId, ethAddress }) {
    if (userId) {
      await this.validateUserIsExist(userId);
      const address = await EthAddressService.findOne({ address: ethAddress });
      await this.validateAddressIsOwnedByUserId(address, userId);

      const user = await UserService.findById(userId).populate('ethAddresses');
      if (!address) {
        const newEthAddress = await EthAddressService.create({ userId: user.id, address: ethAddress });
        if (!newEthAddress) throw WakaspaceError.internal('Failed to create a new eth address');
      }

      return this.populateEthAddressesOfUser(user.id);
    }

    const address = await EthAddressService.findOne({ address: ethAddress });

    if (!address) {
      const newUser = await UserService.create({});
      const newEthAddress = await EthAddressService.create({ userId: newUser.id, address: ethAddress });
      if (!newUser || !newEthAddress) throw WakaspaceError.internal('Failed create a new user or address');
      return this.populateEthAddressesOfUser(newUser.id);
    }

    if (address) {
      const user = await UserService.findById(address.userId).populate('ethAddresses');
      return this.populateEthAddressesOfUser(user.id);
    }
  }

  static async validateUserIsExist(userId) {
    const user = await UserService.findById(userId).populate('ethAddresses');
    if (!user) throw WakaspaceError.badRequest('User not found');
  }

  static async validateAddressIsOwnedByUserId(address, userId) {
    if (address && address.userId != userId)
      throw WakaspaceError.badRequest('This eth address is owned by another user');
  }

  static async populateEthAddressesOfUser(userId) {
    const user = await UserService.findById(userId).populate('ethAddresses');
    let ethAddresses = [];
    const userObj = user.toObject();
    for (const element of userObj.ethAddresses) ethAddresses.push(element.address);
    Reflect.set(userObj, 'ethAddresses', ethAddresses);
    return userObj;
  }
}

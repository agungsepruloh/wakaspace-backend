import { WakaspaceConfig } from '@wakaspace/config';
import Moralis from 'moralis/node';

export default async () => {
  const serverUrl = WakaspaceConfig.moralisServerUrl;
  const appId = WakaspaceConfig.moralisAppId;

  await Moralis.start({ serverUrl, appId });
};

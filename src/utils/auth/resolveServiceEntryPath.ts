import { PATH } from '@constants/path';

const resolveServiceEntryPath = (hasTeam: boolean) => (hasTeam ? PATH.FEED : PATH.ENTRY);

export default resolveServiceEntryPath;

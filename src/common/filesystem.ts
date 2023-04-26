import { registerAs } from '@nestjs/config';
export default registerAs('filesystem', () => ({
  disks: {
    docs: {
      driver: 'local',
      basePath: '/Users/sagars/Desktop/Projects/Images', // fully qualified path of the folder
      //   baseUrl: 'https://example.com',
    },
    thumb: {
      driver: 'local',
      basePath: '/Users/sagars/Desktop/Projects/Images/200x200', // fully qualified path of the folder
      //   baseUrl: 'https://example.com',
    },
  },
}));

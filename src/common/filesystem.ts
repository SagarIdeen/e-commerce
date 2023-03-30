import { registerAs } from '@nestjs/config';
export default registerAs('filesystem', () => ({
  disks: {
    docs: {
      driver: 'local',
      basePath: '/Users/sagars/Desktop/Projects', // fully qualified path of the folder
      //   baseUrl: 'https://example.com',
    },
  },
}));

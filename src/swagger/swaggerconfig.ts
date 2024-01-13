import swaggerdocs from 'swagger-jsdoc';
import path from 'path';
const swaggerPath = path.join(__dirname, './user.yml');
import config from '../config/env';

const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: '3.0.0',
    info: {
      title: config.WEBSITE_NAME,
      version: '1.0.0',
      contact: {
        name: 'API Support',
        url: 'http://www.example.com/support',
        email: 'support@example.com',
      },
      license: {
        name: 'Apache 2.0',
        url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
      },
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    },
    servers: [{ url: config.API_URL, description: 'Development Server' }],
  },
  apis: [swaggerPath],
};

const openapiSpecification = swaggerdocs(options);

export default openapiSpecification;

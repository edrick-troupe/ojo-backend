/** As required by Apollo we use a schema to define the structure 
 * of data that clients can query.
 */

import fs from 'node:fs';
import path from 'node:path';
import * as url from 'url';
import { EOL } from 'node:os';

const dirname = url.fileURLToPath(new URL('.', import.meta.url));
// Provide us with the main path of the project

const schemas = [
  'query',
  'mutation',
  'event',
  'user',
  'game',
  'site',
  'weather',
  'event_has_user',
].map(
  (file) => fs.readFileSync(path.resolve(`${dirname}./schemas/${file}.gql`)),
);
// Map will return an array of each path of schemas

export default `
#graphql
${schemas.join(EOL)}
`;
// EOL is an equivalent of "\n" (New Line) on Mac and Linux and 
// to "\r\n" (Return line + New line) on windows



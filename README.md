# Express sequelize Blog
## With registration (hash password), authorization (passportJS), validation (express-validator), paginate (express-paginate) and seed

[Working Example](http://87.236.23.246/)  

* [bcryptjs](https://www.npmjs.com/package/bcryptjs)  
* [bluebird](https://www.npmjs.com/package/bluebird)  
   - [bluebird website](http://bluebirdjs.com/docs/getting-started.html)  
* [compression](https://www.npmjs.com/package/compression)  
* [connect-flash](https://www.npmjs.com/package/connect-flash) <details>
   <summary>connect-flash description</summary>
   
     <p>The __flash__ is a special area of the session used for storing messages. Messages are written to the flash and cleared after
        being displayed to the user. The flash is typically used in combination with redirects, ensuring that the message is available  to the next page that is to be rendered.</p>
   </details>  
* [cookie-parser](https://www.npmjs.com/package/cookie-parser)  
* [debug](https://www.npmjs.com/package/debug)  
* [express](https://www.npmjs.com/package/express):  
   - [express-messages](https://www.npmjs.com/package/express-messages)  The express-messages module provides flash notification rendering.  
   - [express-paginate](https://www.npmjs.com/package/express-paginate)  
   - [express-session](https://www.npmjs.com/package/express-session)  
     <details>
         <summary>express-session warnings</summary>
           <p>
              <b>Note</b> Since version 1.5.0, the [cookie-parser middleware](https://www.npmjs.com/package/cookie-parser) no longer needs to be used for this module to work. This module now directly reads and writes cookies on req/res. Using cookie-parser may result in issues if the secret is not the same between this module and cookie-parser.  
          </p>
          <p>
             <b>Warning</b> The default server-side session storage, MemoryStore, is purposely not designed for a production environment. It will leak memory under most conditions, does not scale past a single process, and is meant for debugging and developing.  
          </p>
          <p>
            For a list of stores, see [compatible session stores](https://www.npmjs.com/package/express-session#compatible-session-stores).  
          </p>
     </details>  
   - [express-validator](https://www.npmjs.com/package/express-validator)  
* [http-errors](https://www.npmjs.com/package/http-errors) Create HTTP errors for Express, Koa, Connect, etc. with ease.  
* [morgan](https://www.npmjs.com/package/morgan) HTTP request logger middleware for node.js  
* [mysql2](https://www.npmjs.com/package/mysql2) MySQL client for Node.js with focus on performance.   
* [passport](https://www.npmjs.com/package/passport) Passport is Express-compatible authentication middleware for Node.js.  
* [passport-local](https://www.npmjs.com/package/passport-local) Passport strategy for authenticating with a username and password.  
* [pug](https://www.npmjs.com/package/pug) Pug is a high performance template engine. [Doumentation](https://pugjs.org/)  
* [sequelize](https://www.npmjs.com/package/sequelize) Sequelize is a promise-based ORM "Object-Relational Mapping" for Postgres, MySQL, SQLite and Microsoft SQL Server.  
* [serve-favicon](https://www.npmjs.com/package/serve-favicon) Node.js middleware for serving a favicon.  
* [sqlite3](https://www.npmjs.com/package/sqlite3) Asynchronous, non-blocking SQLite3 bindings for Node.js.  

```bash
# Add some data with article and user
npm run seed
# Basic
npm start
# DEBUG
npm run develop
# sqlite
export NODE_ENV=development
# mysql
export NODE_ENV=production
```

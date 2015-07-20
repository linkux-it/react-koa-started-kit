Base project layout for ReactJS, KoaJS
======================================

You can use the #[airbnb style guide](https://github.com/airbnb/javascript)

This base templates will try to handle the base structure
using many tools to improve productivity.

This assume you are using iojs for developing backend
and ecmascript 2015

Templates should be modified when start production, searching the best way do to it

Frameworks to use:
------------------

* KoaJS
* ReactJS
* Mocha

Tools:
------

1. Gulp.- Will be used to add some automatic tasks like transpile on frontend code, minify, uglify for production.

2. Editorconfig.- Just create the config file to help some conventions that the team should handle it.

3. ESLint.- Config to set the configs files to allow us do better code that depends on side we are coding.

4. Live reload

5. nodemon

6. sass, compasss

7. Babel to use es6

8. Precommit done

Directories
-----------

* frontend.- should store css, scss, and any other frontend source file and gulp will its work and put on * public *. The other directories are the normal ones for common layout.
* fronend/scripts has react code
* app.- has all server side code
* lib.- is for any app, library or anything else

Some Points
-----------

* indes.jsx  file imports are relative imports
* all server side are normal import as it is libraries

module.exports = {
    src_files:{
        server:{
            all: "./src/server/**/*",
            ts: "./src/server/**/*.ts"
        },
        client: {
            all: "./src/client/**/*",
            ts: "./src/client/**/*.ts",
            js: "./src/client/**/*.js",
            non_scripts: ["./src/client/**/*.html", "./src/client/**/*.css"]
        }
    },
    development: {
        buildDir: "./bin/debug",
        buildDirClient: "./bin/debug/app"
    },
    production: {
        buildDir: "./bin/release",
        buildDirClient: "./bin/release/app"
    },
    test: {
        buildDir: "./bin/test",
        buildDirClient: "./bin/test/app"
    },
    server: {
        ts_dependencies: ['typings/globals/pg-promise/*.d.ts',
        'typings/globals/body-parser/*.d.ts','typings/globals/express/*.d.ts',
        'typings/globals/express-serve-static-core/*.d.ts',
        'typings/globals/node/*.d.ts', 'typings/globals/serve-static/*.d.ts',
        'typings/globals/spex/*.d.ts', 'typings/globals/mime/*.d.ts',
        'typings/modules/pg/*.d.ts'],
        ts_configuration: {
            target: "ES6",
            module: "commonjs"
        }
    },
    client: {
        ts_dependencies: ['typings/globals/core-js/*.d.ts',
            'typings/globals/jasmine/*.d.ts',
            'typings/globals/node/*.d.ts'],
        ts_configuration: {
            target: "ES5",
            module: "commonjs",
            moduleResolution: "node",
            emitDecoratorMetadata: true,
            experimentalDecorators: true,
            removeComments: false,
            noImplicitAny: false
        },
        js_dependencies: ['node_modules/core-js/client/shim.min.js',
            'node_modules/zone.js/dist/zone.js',
            'node_modules/reflect-metadata/Reflect.js',
            'node_modules/systemjs/dist/system.src.js'],
        vendor_folder: "lib"
    }
};
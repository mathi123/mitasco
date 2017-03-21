module.exports = {
    src_files:{
        all: "./src/**/*",
        ts: "./src/**/*.ts",
        shared: "./src/shared/**/*.ts",
        tests: ["./test/**/*.test.js", "./test/rest-api/**/*.test.js"],
        apiDocumentation: ["./swagger.yml"]
    },
    buildDir: "./bin",
    runScript: "./bin/server.js",
    path_tests: ["test/**/*.test.js"],
    docs_url: "https://github.com/swagger-api/swagger-ui/archive/v2.2.6.zip",
    docs: "documentation",
    dbConfig: "database.json"
};
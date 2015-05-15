module.exports = function(grunt) {
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-nodemon");
    grunt.loadNpmTasks("grunt-concurrent");
    grunt.loadNpmTasks("grunt-contrib-less");

    grunt.initConfig({
        concurrent: {
            dev: {
                tasks: ["nodemon", "watch"],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        nodemon: {
            dev: {
                script: "index.js"
            }
        },
        watch: {
            options: {
                livereload: true
            },
            less: {
                files: "src/styles/**/*.less",
                tasks: ["less"]
            },
            html: {
                files: "./**/*.html",
                tasks: []
            }
        },
        less: {
            dev: {
                files: {
                    "build/css/style.css": "src/styles/main.less"
                }
            }
        }
    });
    grunt.registerTask("default", ["less", "concurrent"]);
}

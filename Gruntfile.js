module.exports = function(grunt) {
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-nodemon");
    grunt.loadNpmTasks("grunt-concurrent");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-autoprefixer");
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
            },
            css: {
                files: "src/css/**/*.css",
                tasks: ["autoprefixer"]
            }
        },
        less: {
            dev: {
                files: {
                    "src/css/style.css": "src/styles/main.less"
                }
            }
        },
        autoprefixer: {
            dev: {
                expand: true,
                flatten: true,
                src: "src/css/style.css",
                dest: "build/css/"
            }
        }
    });
    grunt.registerTask("default", ["less", "autoprefixer", "concurrent"]);
}

module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-pug');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-concurrent');

	grunt.initConfig({
		sass: {
			dev: {
				options: {
					style: 'expanded',
					update: true
				},
				files: {
					'./frontend/build/css/style.css': './frontend/src/scss/style.scss'
				}
			},
			prod: {
				options: {
					style: 'nested',
					sourcemap: 'none'
				},
				files: {
					'./frontend/build/css/style.css': './frontend/src/scss/style.scss'
				}
			}
		},
		clean: {
			all: [
				'./frontend/build'
			]
		},
		copy: {
			bootstrap: {
				expand: true,
				cwd: './frontend/src/bootstrap/',
				src: '**',
				dest: './frontend/build/bootstrap/'
			}
		},
		pug: {
			compile: {
				options: {
					client: false,
					pretty: false
				},
				files: [ {
					cwd: './frontend/src/pug/',
					src: '**/*.pug',
					dest: './frontend/build/',
					expand: true,
					ext: '.html'
				} ]
			}
		},
		browserify: {
			dev: {
				files: {
					'./frontend/build/js/main.js': './frontend/src/js/main.js'
				},
				options: {
					browserifyOptions: { debug: true },
					transform: [
						['babelify', { 'presets': ['es2015'] }]
					]
				}
			},
			prod: {
				files: {
					'./frontend/build/js/main.js': './frontend/src/js/main.js'
				},
				options: {
					browserifyOptions: { debug: false },
					transform: [
						['babelify', { 'presets': ['es2015'] }]
					]
				}
			}
		},
		uglify: {
			prod: {
				compress : true,
				mangle: {
					reserved: ['jQuery', 'bootstrap'],
					reserveDOMCache: true
				},
				files: {
					'./frontend/build/js/main.js': './frontend/build/js/main.js'
				}
			}
		},
		watch: {
			scripts: {
				files: ['./frontend/src/js/*.js'],
				tasks: ['browserify:dev'],
				options: {
					interrupt: true,
				},
			},
			scss: {
				files: ['./frontend/src/scss/*.js'],
				tasks: ['sass:dev'],
				options: {
					interrupt: true,
				},
			},
			pug: {
				files: ['./frontend/src/pug/*.js'],
				tasks: ['pug:compile'],
				options: {
					interrupt: true,
				},
			}
		},
		concurrent: {
			watch: ['watch:scripts', 'watch:scss', 'watch:pug'],
		}
	});

	grunt.registerTask('watch', [
		'concurrent:watch'
	]);

	grunt.registerTask('compile:js:dev', [
		'browserify:dev'
	]);

	grunt.registerTask('compile:js:prod', [
		'browserify:prod',
		'uglify:prod'
	]);

	grunt.registerTask('build:dev', [
		'clean:all',
		'sass:dev',
		'copy:bootstrap',
		'pug:compile',
		'compile:js:dev'
	]);

	grunt.registerTask('build:prod', [
		'clean:all',
		'sass:prod',
		'copy:bootstrap',
		'pug:compile',
		'compile:js:prod'
	]);

	grunt.registerTask('build', [
		'build:dev'
	]);

};
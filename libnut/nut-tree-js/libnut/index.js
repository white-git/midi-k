const libnut = (() => {
	switch (process.platform) {
		case 'win32':
			return require(`../libnut-win32`);
		case 'linux':
			return require(`../libnut-linux`);
		case 'darwin':
			return require(`../libnut-darwin`);
	}
})();

module.exports = libnut;

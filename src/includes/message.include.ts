export default class EmphMessages {
	styles: string;
	successStyle: string;
	warningStyle: string;
	errorStyle: string;
	constructor() {
		this.styles = `
			display: inline-block;
			padding-top: 10px;
			padding-right: 15px;
			padding-bottom: 10px;
			padding-left: 15px;
			font-size: 18px;
		`.trim();
		this.successStyle = `color: rgba(132, 203, 77);background-color: #287c03;`
		this.warningStyle = ``;
		this.errorStyle = ``;
	}

	format(style: string): string {
		return this.styles.replace(/[\r\s\n]+/gm, '').trim() + style;
	}

	success(message: string): void {
		const style = this.format(this.successStyle)
		console.log('%cSuccess ' + message, style);
	}

	warn(warning: string): void {
		console.warn('❗️Warning::' + warning);
	}

	err(errorName: string): never {
		throw new Error('🚨Error::' + errorName);
	}
}

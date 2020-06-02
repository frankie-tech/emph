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
		`;
		this.successStyle = `color: rgba(132, 203, 77);background-color: #287c03;`
		this.warningStyle = ``;
		this.errorStyle = ``;
	}

	success(message: string): void {
		console.log('%cSuccess ' + message, this.successStyle);
	}

	warn(warning: string): void {
		console.warn('❗️Warning::' + warning);
	}

	err(errorName: string): never {
		throw new Error('🚨Error::' + errorName);
	}
}

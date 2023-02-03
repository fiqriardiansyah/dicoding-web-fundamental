class LoadingComponent extends HTMLElement {
  constructor() {
    super();
    this.shadowDom = this.attachShadow({ mode: 'closed' });
  }

  connectedCallback() {
    this.size(this.getAttribute('size') || 20);
  }

  size(size) {
    this.size = size;
    this.render();
  }

  render() {
    this.shadowDom.innerHTML = `
    <style>
        .lds-ring {
            display: inline-block;
            position: relative;
            width: ${this.size}px;
            height: ${this.size}px;
        }
        .lds-ring div {
            box-sizing: border-box;
            display: block;
            position: absolute;
            width: ${this.size}px;
            height: ${this.size}px;
            margin: 8px;
            border: 2px solid #a1a1a1;
            border-radius: 50%;
            animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
            border-color: #a1a1a1 transparent transparent transparent;
        }
        .lds-ring div:nth-child(1) {
            animation-delay: -0.45s;
        }
        .lds-ring div:nth-child(2) {
            animation-delay: -0.3s;
        }
        .lds-ring div:nth-child(3) {
            animation-delay: -0.15s;
        }
        @keyframes lds-ring {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    </style>
    <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
        <div>
    `;
  }
}

customElements.define('loading-component', LoadingComponent);
export default LoadingComponent;

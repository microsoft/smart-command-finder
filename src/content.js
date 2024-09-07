const iconBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABBCAMAAABW61JJAAAB4FBMVEUAAABDRN46StlZPOQiYs8ga8EtVdQjYckcdrIgfaxYNOggZsQ0T9ciYMpkMO0ah6U3TdhLPuEfa75LP+EgacAafK1ZNedkLu0facBsKe9mKu9vJPJeMestVdMiXs0fbL4XjJtTOOVOPuNGQt8iYMoebbsbeLEafqpxI/Mdcbcbe60Xi5wiXswiYskafqkmWtBMP+IyUtYiY8UYh6ROPeIYhaE6StpkLe1SOuQbe61uJvEoWtAYhaIXiZ5AR91ASdsedbRbNOg4TdkYhqJjLewcd7JrJvEjW88agqcYjZwecLgec7VnKe07S9oXhqIgbL0ceK9WOOdQPeQ3TdZKQN9cMOkgZsIaeaxQPOMgZcUcdLQ5TNkdcLlBRt09SNsdc7ZQO+Q6StpHQt8/SNw3TdgebrscdrJIQeBFQt8be61MPuIwUtUhYckhY8cdcrdVN+dTOeVKQOE8Sts2T9csVtMgZcUgZ8Mbd7EbebAafatERN5AR901T9cuVNQoWNEebL1LPuFDRd4yUdYbeq5eMetbM+lNPOMmWtAjXM8iXc0fa78XiZ4iYMogacEbeLAZf6lpKfBjLe1YNehJQOEzUNYZgacYgqUYhaNvJPJsJ/FmK+5gL+sYhqFhLuxSOuUiX8saWDlSAAAAWnRSTlMA/iAQECBfQEAQ/t+/vyAg37+/n5+fj2BgQP7v7+/v7+/f39/f39/fv7+/v6+fgH9vb29fUEAw7+/v39/f38/Pz7+/v6+vn5+fn5CQj4+PgIB/cHBgUFBQQDDce3rZAAACnklEQVRYw+3U6V8SQRgH8AFBQCIJOTSvzCuvtPu+7/u+QBTW4lhBQyyxzBCKMolSOuzSf7WdnVnZ3XJ3dnznx+f98+X3G+ABG7OeR1+2pvW7zTr/if30+30J5oV/aIxe2I6A07T7e1kIDAR9tO9QlS4yOv/AmO8ObQMWA5vo9h8G0sWIDlZIGuga5Ngwo3vJAVO7aPY3N+XS4QgCqDq4lwTgcTJDEeHW08AKMJUZLte4XuYeRcAMBsZ7tazXuOsWSoCPB6aPXDCRfXbN1QN/3rytkCZ4NT797v1sS4+64an9vHVeDAzBBMMIyMfi1vsq4Rd/IICvkAhH/BAQEizH4s+eK4fYwQE/538hgE2E4Z9RBjgUgUUxkBOAL0IFCHxUBGoFoEKSQAw0aqnARP5N4FT+AxyWJGD4BEkxYDUCZeE8TrAKYDOq/5I8Z+v+DzTYqkkPw71TC6NLAbYoBmzlms6Kp0kK1Js035ODgTQPBCFQr6c46vAN0EmE54BitqQTzAyfIGMHsrFYCIDbrHCUM7IAxo5B77lK9e+TxecgmdFL91tHBr2hNoIORQzIjnJ1PwdMpMyqQJ9wkGQNHBAIpVzqHQRA1uAJn6BwiKADw99UeQMMRNU76Ju5kxi0y35ErRzg5d4g2wnUharj9mvSfYPzNUqQik7uBJrHsNv6oQRMtu+p1LZt404iAkIQ+PT12/cz5IaxJRbHAPctTmQR8HvuGKnQnccAfkQBmOsiBGbz4gQiYBsh0LBcSgAraAZ686sAl0i/hG5xhcIK0GUBpGPqscqBo9f3AU3zyIkrFOAjXoTbWucGToB+yjTj4IFUNuoCdGPux29gBpTTOMInaAe0cxklcFEDZvQGDwD1dMCL1gnox3LlZNtNC1hv8xeN7Zf6TKs/pwAAAABJRU5ErkJggg==";

const commandDom = document.createElement('div');
const shadow = commandDom.attachShadow({ mode: 'open' });
const style = document.createElement('style');
style.textContent = `
  .wrapper {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(2px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .content {
    width: min(800px, 80vw);
    display: flex;
    background: rgba(255, 255, 255, 0.93);
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-radius: 32px;
    backdrop-filter: blur(42px);
    padding: 32px 24px;
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;
  }
  .title {
    display: flex;
    align-items: center;
  }
  .title > img {
    width: 32px;
    height: 32px;
    margin-inline-end: 8px;
  }
  .title span {
    color: #16394A;
    font-size: 28px;
    line-height: 130%;
    font-family: "Segoe Sans";
    font-style: normal;
    font-weight: 300;
    text-align: start;
 }
  input {
    margin-top: 24px;
    height: 80px;
    border-radius: 20px;
    color: #181921;
    padding: 16px;
    box-sizing: border-box;
    font-size: 24px;
    line-height: 145%;
    font-family: "Segoe Sans";
    font-style: normal;
    font-weight: 400;

    border: none;
    outline: none;
    background: rgba(123, 117, 114, 0.08);
    box-shadow: var(--Layout-Inner-shadow-Composer-Input-X-Offset, 0px) var(--Layout-Inner-shadow-Composer-Input-Y-Offset, 1.399px) var(--Layout-Inner-shadow-Composer-Input-Blur-radius, 2.797px) var(--Layout-Inner-shadow-Composer-Input-Spread, 0px) var(--Color-Control-Color-L2---Composer-Input-Inner-shadow, rgba(0, 0, 0, 0.08)) inset, var(--Layout-Drop-shadow-Composer-Input-X-Offset, 0px) var(--Layout-Drop-shadow-Composer-Input-Y-Offset, 1.399px) var(--Layout-Drop-shadow-Composer-Input-Blur-radius, 1.399px) var(--Layout-Drop-shadow-Composer-Input-Spread, 0px) var(--Color-Control-Color-L2---Composer-Input-Drop-shadow, #FFF);
  }
  .item {
    margin-top: 16px;
    height: 56px;
    padding: 8px 28px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
  .item:hover {
    border-radius: 16px;
    background: #DFDFDF;
  }
  .item > .icon {
    width: 32px;
    height: 32px;
    margin-inline-end: 16px;
  }
  .item > .name {
    color: #16394A;
    font-family: "Segoe Sans";
    font-size: 20px;
    font-style: normal;
    font-weight: 350;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

`;

const template = document.createElement('template');
template.innerHTML = `
  <div class="wrapper">
    <div class="content">
      <div class="title">
        <img src=${iconBase64} />
        <span>Hi, what do you want to do?</span>
      </div>
      <input type="text" placeholder="Anything you need...">
      <div class="list"></div>
    </div>
  </div>
`;

shadow.appendChild(style);
shadow.appendChild(template.content.cloneNode(true));

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    commandDom.remove();
  }
});

commandDom.shadowRoot.querySelector('input').addEventListener('input', function (event) {
  const url = location.href;
  const keywords = event.target.value;
  chrome.runtime.sendMessage({ url, keywords }, res => {
    const listDom = commandDom.shadowRoot.querySelector('.list');
    while (listDom.firstChild) {
      listDom.removeChild(listDom.firstChild);
    }
    res.forEach(extension => {
      const item = document.createElement('div');
      item.className = 'item';
      item.innerHTML = `
        <img class="icon" src=${extension.thumbnail} />
        <div class="name">${extension.name}</div>
        `;
      listDom.appendChild(item);
    });
  });
});

document.addEventListener('keydown', function (event) {
  if (event.metaKey && event.key === '/') {
    if (commandDom.parentNode) {
      commandDom.remove();
    } else {
      document.body.appendChild(commandDom);
      commandDom.shadowRoot.querySelector('input').focus();
    }
  }
}, true);
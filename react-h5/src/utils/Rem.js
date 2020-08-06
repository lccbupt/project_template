/**
 * designWidth：设计图的宽
 * designHeight：设计图的高，coverMode为true时，必须设置designHeight
 * coverMode为true时，必须设置designHeight。此时页面表现和游戏一样。比如：页面不能滑动，只在当前的全屏页面进行交互，并且交互区域宽高比例和设计图的宽高比例一致。参考页面 https://h5.zhongguowangshi.com/h5/fcsb/index.html
 */
/* eslint-disable */ 
function isNumber(input) {
  return Object.prototype.toString.call(input) === '[object Number]';
}

function isFunction(input) {
  return Object.prototype.toString.call(input) === '[object Function]';
}

/**
 * let rem = new Rem({designWidth: 750});
 * let width = rem.getWidth();
 * let height = rem.getHeight();
 * rem.addResizeListener(callback);
 * rem.removeResizeListener(callback);
 * rem.ready(function(){css的rem机制设置完成后，执行该回调方法})
 */
class Rem {
  constructor({
    designWidth,
    designHeight,
    coverMode = false
  }) {
    if (!isNumber(designWidth)) {
      throw new Error('参数designWidth必须是数字');
    }
    if (coverMode) {
      if (!isNumber(designHeight)) {
        throw new Error('当coverMode为true时，参数designHeight必须是数字');
      }
      this.designHeight = designHeight;
    }
    // 基准大小：用于计算px到rem的缩放比率；例如设计稿100px（baseSize=100时），计算后为1rem
    this.baseSize = 100
    this.coverMode = coverMode;
    this.designWidth = designWidth;

    this.previousHeight = null;
    this.previousWidth = null;

    this.resizeListeners = [];
    this.readyExecuted = false;

    this.doc = document.documentElement;

    window.addEventListener('resize', this.resizeHandler);
  }

  getHeight() {
    return this.doc.clientHeight || this.doc.getBoundingClientRect().height;
  }

  getWidth() {
    let _width = this.doc.clientWidth || this.doc.getBoundingClientRect().width;

    if (this.coverMode) {
      let _height = this.getHeight();
      let _designWHScale = this.designWidth / this.designHeight;
      return (_width / _height) > _designWHScale ? _height * _designWHScale :
        _width;
    } else {
      return _width;
    }
  }

  widthChanged() {
    let _width = this.getWidth();
    if (this.previousWidth != _width) {
      this.previousWidth = _width;
      return true;
    }
    return false;
  }

  heightChanged() {
    let _height = this.getHeight();
    if (this.previousHeight != _height) {
      this.previousWidth = _height;
      return true;
    }
    return false;
  }

  resizeHandler = ({
    callback,
    loop
  }) => {
    if (this.widthChanged() || (this.coverMode && this.heightChanged())) {
      let fontSize = Math.floor(this.baseSize * (this.getWidth() / this.designWidth));
      this.doc.style.fontSize = fontSize + 'px';
      isFunction(callback) && callback();
      this.resizeListeners.forEach(function(
        listener) {
        listener();
      });

      setTimeout(() => {
        let computedFontSizeStyle = window.getComputedStyle(document.getElementsByTagName(
          "html")[0]).fontSize;
        if (computedFontSizeStyle) {
          let computedFontSize = parseInt(computedFontSizeStyle.split('p')[
            0]);
          let inaccuracy = Math.abs((computedFontSize - fontSize) /
            fontSize);

          if (inaccuracy > 0.01) {
            let accurateFontSize = fontSize * (fontSize / computedFontSize);
            this.doc.style.fontSize = accurateFontSize + 'px';
          }
        }
      }, 50);
    }

    if (loop) { this.loopWindowSize() }
  };

  loopWindowSize = () => {
    setTimeout(() => {
      this.resizeHandler({
        loop: true
      });
    }, 1000);
  };

  checkBrowser = (onReady) => {
    if (this.getWidth() === 0) {
      setTimeout(() => {
        this.checkBrowser(onReady);
      }, 100);
      return;
    }

    this.resizeHandler({ callback: onReady });
    this.loopWindowSize();
  };

  addResizeListener(listener) {
    this.resizeListeners.push(listener);
  }

  removeResizeListener(listener) {
    this.resizeListeners = this.resizeListeners.filter(function(
      _listener) {
      return _listener !== listener
    });
  }

  ready(onReady) {
    if (this.readyExecuted) {
      return;
    }
    this.readyExecuted = true;
    this.checkBrowser(onReady);
  }
}

export default Rem

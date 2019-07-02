const addClass = (className, context) => context.classList.add(className),
  removeClass = (className, context) => context.classList.remove(className),
  hasClass = (className, context) => context.classList.contains(className);

class iLayout {
  constructor(container) {
    this.container = container;
    this.positionsContainer = container.querySelector('.layout__positions');
    this.actionButton = container.querySelector('.layout__button');
    this.result = container.querySelector('.layout__result');
    this.layout = {
      left: null,
      top: null,
      bottom: null
    };
    this.createCanvas();
    this.registerEvents();
  }

  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.classList.add('canvas');
    this.canvas.style.display = 'none';
    this.container.appendChild(this.canvas);
  }

  registerEvents() {
    this.positionsContainer.addEventListener('dragover', event => {
      event.preventDefault();
      const target = event.target;

      if(!hasClass('layout__item', target)) {
        return
      }

      addClass('layout__item_active', target);
    });

    this.positionsContainer.addEventListener('dragleave', event => {
      event.preventDefault();
      const target = event.target;

      if(!hasClass('layout__item', target)) {
        return
      }

      removeClass('layout__item_active', target);
    });

    this.positionsContainer.addEventListener('drop', this.addImageToCollage.bind(this));
    this.actionButton.addEventListener('click', this.onActionBtnClick.bind(this));
  }

  onActionBtnClick(event) {
    event.preventDefault();
    this.canvas.width = this.positionsContainer.clientWidth;
    this.canvas.height = this.positionsContainer.clientHeight;
    const ctx = this.canvas.getContext('2d'),
      self = this;

    Object.keys(this.layout).forEach(key => {
      const layoutItem = self.container.querySelector('.layout__item_' + key),
        image = this.layout[key],
        layoutPosition = [
          layoutItem.offsetLeft - this.positionsContainer.offsetLeft,
          layoutItem.offsetTop - this.positionsContainer.offsetTop
        ];

      //очищаем прямоугольник равный по размерам и положению картинке, которую вставляем
      ctx.clearRect(layoutPosition[0], layoutPosition[1], image.clientWidth, image.clientHeight);
      //рисуем картинку
      ctx.drawImage(this.layout[key], layoutPosition[0], layoutPosition[1], image.clientWidth, image.clientHeight);
    });

    const resultImage = new Image();
    resultImage.src = this.canvas.toDataURL();

    this.result.value = resultImage.outerHTML;
  }

  addImageToCollage(event) {
    event.preventDefault();
    const target = event.target,
      self = this;

    if(!hasClass('layout__item', target)) {
      return
    }

    removeClass('layout__item_active', target);

    const file = event.dataTransfer.files[0],
      imageTypeRegExp = /^image\//;

    if(file && imageTypeRegExp.test(file.type)) {
      const fr = new FileReader(),
        layoutPart = target.className.match(/layout__item_(.*?)$/)[1];

      fr.addEventListener('load', () => { // file is loaded
        const image = new Image();
        image.src = fr.result;
        addClass('layout__image', image);
        target.appendChild(image);

        self.layout[layoutPart] = image;
      });

      fr.readAsDataURL(file);
    }
  }
}

new iLayout(document.getElementById('layout'));

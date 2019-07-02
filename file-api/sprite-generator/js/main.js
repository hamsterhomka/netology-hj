const prop = (data, name) => data.map(item => item[name]),
  summ = data => data.reduce((total, value) => total + value, 0);

class SpriteGenerator {
  constructor(container) {
    this.uploadButton = container.querySelector('.sprite-generator__upload');
    this.submitButton = container.querySelector('.sprite-generator__generate');
    this.imagesCountContainer = container.querySelector('.images__added-count-value');
    this.codeContainer = container.querySelector('.sprite-generator__code');
    this.imageElement = container.querySelector('.sprite-generator__result-image');
    this.canvas = container.querySelector('#canvas');
    this.images = [];

    this.registerEvents();
  }

  registerEvents() {
    this.uploadButton.addEventListener('change', this.onFilesChange.bind(this));
    this.submitButton.addEventListener('click', this.onGenerateBtnClick.bind(this));
  }

  onGenerateBtnClick(event) {
    event.preventDefault();

    this.createSpriteImage()
      .then(this.createCssCode.bind(this));
  }

  createCssCode(images) {
    let cssCode = '.icon {\n' +
      '  display: inline-block;\n' +
      '  background-image: url("url/sprite.png");\n' +
    '}',
      leftOffset = 0;

    images.forEach((image, i) => {
      cssCode += '\n\n' +
        '.icon_' + i + ' {\n' +
        '  background-position: ' + -leftOffset + 'px 0;\n' +
        '  width: ' + image.width + 'px;\n' +
        '  height: ' + image.height + 'px;\n' +
      '}';

      leftOffset += image.width;
    });

    this.codeContainer.value = cssCode;
  }

  onFilesChange(event) {
    const files = Array.from(event.currentTarget.files),
      imageTypeRegExp = /^image\//;

    files.forEach(file => {
      if(imageTypeRegExp.test(file.type)) {
        this.images.push(file);
      }
    });

    this.imagesCountContainer.innerText = this.images.length;
  }

  readImages() {
    const self = this,
      loadedImages = [];

    return new Promise((resolve, reject) => {
      self.images.forEach((image, i) => {
        const fr = new FileReader;

        fr.addEventListener('load', () => { // file is loaded
          const img = new Image;

          img.addEventListener('load', () => {
            loadedImages.push(img);

            //Если последняя картинка загружена то резолвим
            if(i === self.images.length - 1) {
              resolve(loadedImages);
            }
          });

          img.src = fr.result; // is the data URL because called with readAsDataURL
        });

        fr.readAsDataURL(image); // I'm using a <input type="file"> for demonstrating
      });
    });
  }

  createSpriteImage() {
    return this.readImages()
      .then(images => {
        this.loadImagesInCanvas(images);
        this.imageElement.src = canvas.toDataURL();

        return images;
      });
  }

  loadImagesInCanvas(images) {
    const ctx = this.canvas.getContext('2d'),
      imagesWidthValues = prop(images, 'width'),
      totalCanvasWidth = summ(imagesWidthValues),
      maxCanvasHeight = images.reduce((maxCanvasHeight, img) => {
        return img.height > maxCanvasHeight ? img.height : maxCanvasHeight;
      }, 0);
    let leftOffset = 0;

    this.canvas.width = totalCanvasWidth;
    this.canvas.height = maxCanvasHeight;

    images.forEach(img => {
      ctx.drawImage(img, leftOffset, 0);
      leftOffset += img.width;
    });
  }
}

new SpriteGenerator(document.getElementById('generator'));

var $body = document.querySelector('body');

var breakpoints     = {
    mobile              : 375
};

/**
 * Класс для меню
 * @constructor
 */
function Menu() {
    this.btn                    = null;
    this.menu                   = null;
    this.isOpen                 = false;
    this.isMobileBehavior       = false;

    this.init();
}

/**
 * Инициализация меню
 */
Menu.prototype.init = function () {
    var self                    = this;

    self.btn                    = document.querySelector('[data-menu-burger]');
    self.menu                   = document.querySelector('[data-menu]');

    self.setBehaviorState();
    self.toggle(true);

    self.bindEvents();
};

/**
 * Инициализация событий
 */
Menu.prototype.bindEvents = function() {
    var self = this;

    if (this.btn !== null) {
        this.btn.addEventListener('click', function (e) {
            e.preventDefault();
            self.toggle();
            this.blur();
        })

        window.addEventListener('resize', function (e) {
            var oldMobileBehavior = self.isMobileBehavior;
            self.setBehaviorState();

            if (self.isMobileBehavior !== oldMobileBehavior) {
                self.toggle(true);
            }
        })
    }
};

/**
 * Метод устанавливает состояние
 */
Menu.prototype.setBehaviorState = function () {
    this.isMobileBehavior = this.getWindowWidth() < breakpoints.mobile
};

/**
 * Метод получает ширину окна
 *
 * @returns {number}
 */
Menu.prototype.getWindowWidth = function () {
    var d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0];

    return window.innerWidth || e.clientWidth || g.clientWidth;
};

/**
 * Метод открывает меню
 */
Menu.prototype.open = function() {
    var self = this;

    if (self.btn !== null) {
        self.isOpen = true;

        $body.classList.add('is-menu-opened');

        self.btn.classList.add('active');
        self.menu.classList.add('active');
    }
};

/**
 * Метод закрывает меню
 */
Menu.prototype.close = function() {
    var self = this;

    if (self.btn !== null) {
        self.isOpen = false;

        self.menu.classList.remove('active');
        self.btn.classList.remove('active');

        $body.classList.remove('is-menu-opened');
    }
};

/**
 * Метод переключает меню
 *
 * @param isReverse - инверсия состояния
 */
Menu.prototype.toggle = function (isReverse = false) {
    var self = this;

    if (self.isMobileBehavior) {
        if (!isReverse) {
            if (self.isOpen) {
                self.close();
            } else {
                self.open();
            }
        } else {
            if (self.isOpen) {
                self.open();
            } else {
                self.close();
            }
        }
    } else {
        self.close();
    }
};

window.menu = new Menu();
class Basic {
    constructor() {
        this.leftClickListener();
    }

    formatDigits(digit) {
        let formattedNumber = String(digit);
        return (formattedNumber.length < 2) ? '0' + formattedNumber : digit;
    }

    hideElement(classname) {
        let elementsToHide = document.querySelectorAll('.' + classname);

        elementsToHide.forEach(element => {
            let classesList = element.getAttribute('class');
            classesList += ' hidden';
            element.setAttribute('class', classesList);
        });
    }

    showElement(classname) {
        let elementToShow = document.querySelectorAll('.' + classname);
        elementToShow.forEach(element => element.classList.remove("hidden"));
    }

    clickHandler(event, elementToHide, elementToCreate) {
        let btnCode = event.button;
        if (btnCode === 0) {
            this.formatSwitcher();
        }
        if (event === 'switchMode') {
            this.hideElement(elementToHide);
            if (elementToCreate === 'clock') {
                clock = new Clock();
            } else {
                calendar = new Calendar();
            }
        }
    }

    rightClickHandler(mode, elementToHide, elementToCreate) {
        window.oncontextmenu = e => {
            e.preventDefault();
            this.clickHandler(mode, elementToHide, elementToCreate)
        }
    }

    leftClickListener() {
        document.addEventListener('click', e => this.clickHandler(e));
    }
}

class Clock extends Basic {
    constructor() {
        super();
        this.hours = document.querySelector('.hours');
        this.minutes = document.querySelector('.minutes');
        this.seconds = document.querySelector('.seconds');
        this.fulltime = document.querySelector('.fulltime');

        this.isShort = true;
        this.intervalId = this.shortFormat();

        this.interval = function(method) {
            this.intervalId = setInterval(method.bind(this), 1000);
        };

        this.rightClickHandler('switchMode', 'clock', 'calendar');
        this.showElement('clock');
    }

    shortFormat() {
        this.drawTime(false);
    }

    fullFormat() {
        this.drawTime(true);
    }

    drawTime(full) {
        let time = new Date(),
            hours = this.formatDigits(time.getHours()),
            minutes = this.formatDigits(time.getMinutes()),
            seconds = this.formatDigits(time.getSeconds());

        this.hours.innerText = hours;
        this.minutes.innerText = minutes;

        if (!full) {
            this.fulltime.innerText = `${hours}:${minutes}`;
        }
        if (full) {
            this.seconds.innerText = seconds;
            this.fulltime.innerText = `${hours}:${minutes}:${seconds}`;
            this.seconds.style.display = 'block';
        }
    }

    formatSwitcher() {
        this.isShort = !this.isShort;
        clearInterval(this.intervalId);

        if (this.isShort) {
            clearInterval(this.intervalId);
            this.fulltime.innerText = this.fulltime.innerText.slice(0, 5);
            this.seconds.style.display = 'none';
        } else {
            this.fullFormat();
            this.interval(this.fullFormat);
        }
    }
}

class Calendar extends Basic {
    constructor() {
        super();
        this.month = document.querySelector('.month');
        this.year = document.querySelector('.year');
        this.day = document.querySelector('.day');
        this.fullyear = document.querySelector('.fullyear');

        this.dateEu = false;
        this.drawDate(this.dateEu);

        this.rightClickHandler('switchMode', 'calendar', 'clock');
        this.showElement('calendar');
    }

    drawDate(eu) {
        let date = new Date(),
            locale = "en-us",
            month = date.toLocaleString(locale, {
                month: "long"
            }),
            day = this.formatDigits(date.getDate()),
            year = date.getFullYear() + '';

        this.month.innerText = month;
        this.year.innerText = year;
        this.day.innerText = day;

        if (!eu) {
            this.fullyear.innerText = `${day}.${month.slice(0,3)}.${year}`;
        }
        if (eu) {
            this.fullyear.innerText = `${month.slice(0,3)}/${day}/${year.slice(2,4)}`;
        }
    }

    formatSwitcher() {
        this.dateEu = !this.dateEu;

        if (this.dateEu) {
            this.drawDate(true);
        } else {
            this.drawDate(false);
        }
    }
}

function elementsPainter() {
    let component = document.querySelector('.component'),
        getRandomColor = () => {
            let hexiNumbers = '0123456789ABCDEF';
            randomColor = '#';
            for (let i = 0; i < 6; i++) {
                randomColor += hexiNumbers[Math.floor(Math.random() * 16)];
            }
            return randomColor;
        },
        color; 

    component.addEventListener('mouseover', (event) => {
        color = event.target.style.color;
        event.target.style.color = getRandomColor();
    });

    component.addEventListener('mouseout', (event) => {
        event.target.style.color = color;
    });
}

    let clock = new Clock(),
        calendar;

    window.oninit = elementsPainter();

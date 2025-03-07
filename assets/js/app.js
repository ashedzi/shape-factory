'use strict';

const shapeContainer = document.querySelector('.shape-container');
const addShape = document.querySelector('button');
const shapeSelect = document.querySelector('[name="shape"]');
const colorSelect = document.querySelector('[name="color"]');
const alerts = document.querySelector('.alert')

const shapes = [];
let shapeCount = 0;

class Shape {
    constructor(name, color) {
        this._name = name;
        this._color = color;
    }

    get name () {
        return this._name;
    }

    get color () {
        return this._color;
    }

    getInfo() {
        return `${this.color} ${this.name}`;
    }
}

function getColor(color) {
    const colorList = {
        blue: '#09f',
        green: '#9f0',
        orange: '#f90',
        pink: '#f09',
        purple: '#90f'
    };
    return colorList[color.toLowerCase()];
}

function createShape() {
    const shapeName = shapeSelect.value;
    const shapeColor = colorSelect.value;

    if (shapeName === "shape" && shapeColor === "color") {
        alerts.style.visibility = 'visible';
        alerts.textContent = 'Please select both a shape and a color!!';
        return;
    } 
    if (shapes.length >= 24) {
        alerts.style.visibility = 'visible';
        alerts.textContent = 'You have reached the limit!';
        return;
    }

    const newShape = new Shape(shapeName, shapeColor);
    shapes.push(newShape);

    const shapeDiv = document.createElement('div');
    shapeDiv.classList.add(`shape-${shapeName.toLowerCase()}`);
    shapeDiv.style.backgroundColor = getColor(shapeColor);
    shapeDiv.dataset.index = shapeCount;

    shapeDiv.addEventListener('click', () => {
        const index = shapeDiv.dataset.index;
        const shapeInfo = shapes[index].getInfo(); 
        alerts.textContent = `Unit ${parseInt(index) + 1}: ${shapeInfo}`; 
        alerts.style.visibility = 'visible';
    });

    shapeContainer.appendChild(shapeDiv);
    shapeCount++;
}

addShape.addEventListener('click', createShape);

import _ from 'lodash'
import './style.css'
import IMG from './p2.png'
import toml from './data.toml';
import yaml from './data.yaml';
import json from './data.json5';

console.log(toml.title); // 输出 `TOML Example`
console.log(toml.owner.name); // 输出 `Tom Preston-Werner`

console.log(yaml.title); // 输出 `YAML Example`
console.log(yaml.owner.name); // 输出 `Tom Preston-Werner`

console.log(json.title); // 输出 `JSON5 Example`
console.log(json.owner.name); // 输出 `Tom Preston-Werner`


function component(){
    const element = document.createElement('div');

    element.innerHTML = _.join(['hello','webpack'],' ')
    element.classList.add('hello')

    // 将图片添加到已经存在的 div 中
    const myImg = new Image();
    myImg.src = IMG;
    element.appendChild(myImg)

     return element;
}

document.body.appendChild(component())
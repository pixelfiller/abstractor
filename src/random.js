export function radius() {
  const radiuses = [8, 13, 21, 34, 55, 89, 144, 233, 377];
  let radius = radiuses[Math.floor(Math.random() * radiuses.length)];
  return radius
}

export function number(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function evennumber() {
  let range = 20;
  let evenNumber = Math.floor(Math.random() * range / 2) * 2;
  if (evenNumber === 0) {
    return 8;
  } else {
    return evenNumber;
  }
}

export function picker(...array) {
  const items = [...array]
  return items[Math.floor(Math.random() * items.length)]
}

export function color() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function id() {
  return Math.random().toString(36).replace('0.', '');
}


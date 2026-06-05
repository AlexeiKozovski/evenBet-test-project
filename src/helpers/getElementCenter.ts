export type Point = {
  x: number;
  y: number;
};

export function getElementCenter(element: HTMLElement): Point {
  const rect = element.getBoundingClientRect();

  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}

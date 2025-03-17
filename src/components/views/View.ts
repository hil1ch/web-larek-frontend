export interface IView {
   render(data?: object): HTMLElement;  // устанавливаем данные, возвращаем контейнер
}